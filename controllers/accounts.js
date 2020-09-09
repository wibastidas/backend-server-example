
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


    try {

        const account = new Account(req.body);

        await account.save();
    
        res.json({
            ok:true,
            account
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