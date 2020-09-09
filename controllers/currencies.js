
const { response } = require('express');

const Currency = require('../models/currency');

const getCurrencies = async(req, res) => {


    const currencies = await Currency.find({}, 'name code');

    res.json({
        ok:true,
        currencies
    })
}

const createCurrency = async(req, res = response) => {

    const { name, code} = req.body;

    try {

        const existsCurrencyCode = await Currency.findOne({code});

        if(existsCurrencyCode) {
            return res.status(400).json({
                ok: false,
                msg: 'El codigo de moneda ya existe!'
            });
        }

        const currency = new Currency(req.body);

        await currency.save();
    
        res.json({
            ok:true,
            currency
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
    getCurrencies,
    createCurrency
}