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

//Rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/currencies', require('./routes/currencies'));
app.use('/api/accounts', require('./routes/accounts'));
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/transfer', require('./routes/transactions'));

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});