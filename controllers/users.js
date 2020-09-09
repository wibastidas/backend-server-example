
const { response } = require('express');

const User = require('../models/user');

const getUsers = async(req, res) => {


    const users = await User.find({}, 'name');

    res.json({
        ok:true,
        users
    })
}

const createUser = async(req, res = response) => {

    const { name }  = req.body;

    try {

        const user = new User(req.body);

        await user.save();
    
        res.json({
            ok:true,
            user
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
    getUsers,
    createUser
}