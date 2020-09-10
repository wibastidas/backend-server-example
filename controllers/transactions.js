
const { response } = require('express');
const { convertCurrency } = require('../helpers/currency-converter')

const Transaction = require('../models/transaction');
const Account = require('../models/account');
const User = require('../models/user');

const moment = require('moment');

const getTransactions = async(req, res) => {

    const { from, to, sourceAccountID } = req.query;

    // console.log("from: ", from)
    // console.log("to: ", to)
    // console.log("sourceAccountID: ", sourceAccountID)

    const transactions = await Transaction.find({}, 'accountFrom accountTo amount description created_at');

    res.json({
        ok:true,
        transactions
    })
}

const createTrasaction = async(req, res = response) => {

    const { accountFrom, accountTo, amount, description} = req.body;

    try {

        const accountsSame = accountFrom === accountTo;

        //validamos que la cuenta de origen y destino no sean iguales
        if(accountsSame) {
            return res.status(400).json({
                ok: false,
                msg: 'Las cuentas no pueden ser iguales.'
            })
        }

        console.log('accountFrom: ', accountFrom)

        //validar si la cuenta de destino no pertenece al usuario logeado aplicar comision 1% sobre el monto de la cuenta origen
        // const accountOrigin = await Account.findOne({account_number: accountFrom})
        //                                    .populate('user','name');
        // const accountDest = await Account.findOne({account_number: accountTo})
        //                                    .populate('user','name');

        const [ accountOrigin, accountDest] = await Promise.all([
            Account.findOne({account_number: accountFrom}).populate('currency','code').populate('user','name'),
            Account.findOne({account_number: accountTo}).populate('currency','code').populate('user','name')
        ])

        if(!accountOrigin) {
            return res.status(400).json({
                ok: false,
                msg: 'El numero de cuenta Origen no esta registrado.'
            })
        }

        if(!accountDest) {
            return res.status(400).json({
                ok: false,
                msg: 'El numero de cuenta Destino no esta registrado.'
            })
        }

        //validar si la transacción se realiza para un tercero
        if(accountOrigin.user._id.toString() != accountDest.user._id.toString()){
            console.log('Transferencia entre cuentas distinto titular');
            //aplicará una comisión por transacción del 1% del monto transferido
        } else {
            console.log('Transferencia entre cuentas del mismo titular');
        }


        let amountToTransfer;
        let transferFee = 0;
        if(accountOrigin.currency.code.toString() != accountDest.currency.code.toString()) {
            console.log('Transferencia entre cuentas distinta moneda');
            //hay que hacer la conversión a la divisa destino.
            //convertir moneda
            amountToTransfer = await convertCurrency(accountOrigin.currency.code, accountDest.currency.code, amount);
            console.log('amountToTransfer:', amountToTransfer);

            transferFee = amountToTransfer * 0.01;
            console.log('transferFee:', transferFee);

        } else {
            amountToTransfer = amount;
            console.log('Transferencia entre cuentas misma moneda');
        }

        // validar que el monto de la operacion no sea mayor al monto disponible en la cuenta 
        if(amountToTransfer > accountOrigin.balance){
            return res.status(400).json({
                ok: false,
                msg: 'Saldo Insuficiente.'
            });
        }

        // descontar el monto de la cuenta origen y sumarlo a la cuenta destino
        let newBalance = accountOrigin.balance - (parseFloat(amountToTransfer) + parseFloat(transferFee)) ;
        //accountOrigin._id 

        const transaction = new Transaction({accountFrom, accountTo, amount: amountToTransfer, description});
        transaction.created_at = moment().unix();
        const date = moment().unix();
        //console.log('calendar:',  moment.unix(date).format("MMDDYYYY"));

    
        //await transaction.save();
    
        res.json({
            ok:true,
            transaction,
            accountOrigin,
            accountDest
        })
         
    } catch {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisa logs'
        })
    }
}



module.exports = {
    getTransactions,
    createTrasaction
}


// 1234567891 pesos william
// 1234567890 dolares william
// 1234567892 euros william

// 9876543210  pesos otro titular