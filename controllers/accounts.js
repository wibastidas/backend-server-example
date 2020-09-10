
const { response } = require('express');

const Account = require('../models/account');

const getAccounts = async(req, res) => {

    const accounts = await Account.find({}, 'account_number balance user_id currency_id');

    res.json({
        ok:true,
        accounts
    })
}

const createAccount = async(req, res = response) => {

    console.log(req.id);

    const id = req.id;
    const account = new Account({ 
        user: id,
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