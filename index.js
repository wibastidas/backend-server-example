require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./db/config');

//Crear el servidor express
const app = express();

//Configurar CORS
app.use(cors());

//Data Base
dbConnection();

//21uwU4djunPWP4ds
//mean_user
//mongodb+srv://mean_user:21uwU4djunPWP4ds@cluster0.bbdzs.mongodb.net/bankdb

console.log(process.env.PORT);

//Rutas
app.get('/', (req, res) => {

    res.json({
        ok:true
    })
});


app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});