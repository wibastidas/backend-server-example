
const { response } = require('express');

const Transaction = require('../models/transaction');
const moment = require('moment');

const getTransactions = async(req, res) => {

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
                msg: 'Las cuentas no pueden ser iguales'
            })
        }

        //validar si la cuenta de destino no pertenece al usuario logeado aplicar comision 1% sobre el monto de la cuenta origen

        // validar que el monto de la operacion no sea mayor al monto disponible en la cuenta 

        const transaction = new Transaction(req.body);
        transaction.created_at = moment().unix();
        //const date = moment().unix();
        //console.log('calendar:',  moment.unix(date).format("MM/DD/YYYY"));

        

        await transaction.save();
    
        res.json({
            ok:true,
            transaction
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