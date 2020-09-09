
const { response } = require('express');
const bcrypt = require('bcryptjs')

const User = require('../models/user');

const getUsers = async(req, res) => {


    const users = await User.find({}, 'name');

    res.json({
        ok:true,
        users
    })
}

const createUser = async(req, res = response) => {

    const { name, password }  = req.body;

    try {

        const user = new User(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt)

        //guardar usuario
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