
const { response } = require('express');

const Account = require('../models/account');
const Currency = require('../models/currency');


const getAccounts = async(req, res) => {

    const accounts = await Account.find({}, 'account_number balance user_id currency');

    res.json({
        ok:true,
        accounts
    })
}

const createAccount = async(req, res = response) => {

    console.log(req.body.code);

    //check currency code
    const currencyDB = await Currency.find({code: req.body.code});

    console.log("currencyDB:", currencyDB);


    if(!currencyDB) {
        return res.status(404).json({
            ok: false,
            msg: 'Invalid code...'
        });
    }

    const id = req.id;
    const account = new Account({ 
        user: id,
        currency: currencyDB[0],
        ...req.body 
    });

    try {

        //const account = new Account(req.body);

        const accountDB = await account.save();

        //await account.save();
    
        res.json({
            ok:true,
            account: accountDB
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
    getAccounts,
    createAccount
}