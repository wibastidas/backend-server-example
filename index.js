require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./db/config');

//Crear el servidor express
const app = express();

//Configurar CORS
app.use(cors());

//lectura y parseo del body
app.use( express.json() )

//Data Base
dbConnection();

//21uwU4djunPWP4ds
//mean_user
//mongodb+srv://mean_user:21uwU4djunPWP4ds@cluster0.bbdzs.mongodb.net/bankdb

console.log(process.env.PORT);

//Rutas
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/transfer', require('./routes/transactions'));
app.use('/api/currencies', require('./routes/currencies'));
app.use('/api/users', require('./routes/users'));
app.use('/api/accounts', require('./routes/accounts'));


app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});