
const { response } = require('express');
const { convertCurrency } = require('../helpers/currency-converter')

const Transaction = require('../models/transaction');
const Account = require('../models/account');
const moment = require('moment');


const getTransactions = async(req, res) => {

    const { from, to, sourceAccountID } = req.query;

    let query = {
        user: req.id
    };

    (sourceAccountID) ? (query.accountFromId = sourceAccountID) : "";
    (from && to) ? (query.created_at = { $gte: from, $lte: to }) : "";

    const transactions = await Transaction.find(query).sort('-created_at').populate('user','_id').populate('accountFromId');

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

        // descontar el monto de la cuenta origen y sumarlo a la cuenta destino
        let newBalanceOrigin = accountOrigin.balance - (parseFloat(amount) + parseFloat(transferFee)) ;
        let newBalanceDest = accountDest.balance + parseFloat(amountToTransfer);

        //aplicar cargo en la cuenta origen
        const accountOriginUpdated = await Account.findByIdAndUpdate(accountOrigin._id,{ balance: newBalanceOrigin }, {new: true})

        //aplicar abono a la cuenta destino
        const accountDestUpdated = await Account.findByIdAndUpdate(accountDest._id,{ balance: newBalanceDest }, {new: true})

        const transaction = new Transaction({ 
            user: req.id,
            accountFromId: accountOrigin._id, 
            accountToId: accountDest._id, 
            accountFromCode: accountOrigin.currency.code,
            accountToCode: accountDest.currency.code,
            amount: parseFloat(amountToTransfer), 
            description
        });

        const now = new Date()
        transaction.created_at = moment();

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