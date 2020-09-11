# Backend Server Example

Instalar dependencias
```
npm install 
```

Ejecutar el proyecto 
```npm run start:dev```

La aplicación cumple con los requerimientos de la prueba en cuanto a los dos endpoints requeridos, tenemos:
GET    /api/transactionsObtiene las transacciones para el usuario logueado, opcionalmente se puede filtrar por un rango de fechas e incluso por identificador de cuenta origen.
POST  /api/transfer
Realiza la transferencia entre una cuenta de origen y una cuenta destino, las cuentas pueden ser del mismo usuario o no.
Además se disponibilizan los siguientes endpoints:```Users```POST  /api/users
Crea un usuario en la base de datos.GET     /api/usersObtiene todos los usuarios de la base de datos. 
```Login```POST  /api/login
Valida las credenciales del usuario y devuelve un token para futuras operaciones```
Currencies```POST  /api/currencies
Crea una divisa en la base de datos.GET     /api/currenciesObtiene todos las divisa de la base de datos. 
```Accounts```POST  /api/accounts
Crea una cuenta en la base de datos.GET     /api/accountsObtiene todos las cuentas de la base de datos. 
```Transactions```
POST  /api/transactions
Crea una transacción en la base de datos.GET     /api/transactionsObtiene todos las transacciones de la base de datos. 