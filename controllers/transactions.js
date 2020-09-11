
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

        const accountsSame = accountFrom === accountTo;
        if(accountsSame) {
            return res.status(400).json({
                ok: false,
                msg: 'Las cuentas no pueden ser iguales.'
            })
        }

        if(req.id != accountOrigin.user._id) {
            return res.status(400).json({
                ok: false,
                msg: 'La cuenta no pertenece al usuario logeado'
            })
        }

        let transferFee = 0;
        let amountToTransfer;

        //conversión a la divisa destino si son diferentes
        if(accountOrigin.currency.code.toString() != accountDest.currency.code.toString()) {
            amountToTransfer = await convertCurrency(accountOrigin.currency.code, accountDest.currency.code, amount);
        } else {
            amountToTransfer = amount;
        }

        //validar si la transacción se realiza para un tercero y aplicar  comisión  1% del monto transferido
        if(accountOrigin.user._id.toString() != accountDest.user._id.toString()){
            transferFee = amount * 0.01;
        } 

        // validar que el monto de la operacion no sea mayor al monto disponible en la cuenta 
        if(amountToTransfer > accountOrigin.balance){
            return res.status(400).json({
                ok: false,
                msg: 'Saldo Insuficiente.'
            });
        }

        console.log('transferFee', transferFee);
        // descontar el monto de la cuenta origen y sumarlo a la cuenta destino
        let newBalanceOrigin = accountOrigin.balance - (parseFloat(amount) + parseFloat(transferFee)) ;
        let newBalanceDest = accountDest.balance + parseFloat(amountToTransfer);


        //aplicar cargo en la cuenta origen
        const accountOriginUpdated = await Account.findByIdAndUpdate(accountOrigin._id,{ balance: newBalanceOrigin }, {new: true})

        //aplicar abono a la cuenta destino
        const accountDestUpdated = await Account.findByIdAndUpdate(accountDest._id,{ balance: newBalanceDest }, {new: true})

        //crear la transaccion
        const transaction = new Transaction({accountFrom, accountTo, amount: parseFloat(amountToTransfer), description});
        transaction.created_at = moment().unix();
        //transaction.created_at = moment().add(1, 'day').unix();

        //const date = moment().unix();
        //console.log('calendar:',  moment.unix(date).format("MMDDYYYY"));

        await transaction.save();
    
        res.json({
            ok:true,
            transaction,
            accountOriginUpdated,
            accountDestUpdated
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