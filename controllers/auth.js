const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs')

const login = async( req, res = response) => {

    const { email, password } = req.body;

    try {

        //verificar email
        const userDB = await User.findOne({email});

        if(!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no válido...'
            });
        }

        //verificar password

        const validPassword = bcrypt.compareSync(password, userDB.password);

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Password no válido...'
            });
        }

        //generar token

        res.json({
            ok: true,
            msg: 'Usuario logeado'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Login Faild...'
        });
    }
}

module.exports = {
    login
}