
const { response } = require('express');

const Transaction = require('../models/transaction');

const getTransactions = async(req, res) => {

    const transactions = await Transaction.find({}, 'accountFrom accountTo amount date description');

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