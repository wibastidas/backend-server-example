# Backend Server Example

Instalar dependencias
```
npm install 
```

Ejecutar el proyecto 
```
npm run start:dev
```

## Endpoints disponibles:

#### Users
`POST  /api/users`
Crea un usuario en la base de datos. 
Recibe los cambos name, email y password. 
Guarda la contraseña encriptada en la base de datos utilizando bcrypt library y genera un JSON Web token para la autenticacion*.  

`GET   /api/users`
Obtiene todos los usuarios de la base de datos.  

#### Login
`POST  /api/login`
Valida las credenciales del usuario y devuelve un JSON Web token necesario para realizar `transactions` en la aplicación.  

#### Currencies
`POST  /api/currencies`
Crea una divisa en la base de datos.  Recibe name y code. 
`GET     /api/currencies`
Obtiene todos las divisa de la base de datos.  

#### Accounts
`POST  /api/accounts`
Crea una cuenta en la base de datos.  
El Schema Account tiene una referencia del Schema User para relacionar con usuario pertenece la cuenta. (En este caso el usuario que la creo).  
El Schema Account tiene una referencia del Schema Currency para relacionar con la informacion de la divisa.  
`GET     /api/accounts`
Obtiene todos las cuentas de la base de datos.   

#### Transactions
`GET    /api/transactions`
Obtiene las transacciones para el usuario logueado, opcionalmente se puede filtrar por un rango de fechas e incluso por identificador de cuenta origen.  
El Schema Transaction tiene una referencia del Schema Account para relacionar con la informacion de las cuentas de origen y destino.
El Schema Transaction tiene una referencia del Schema User para saber el usuario que realizo la transaction
`POST  /api/transfer`
Realiza la transferencia entre una cuenta de origen y una cuenta destino, las cuentas pueden ser del mismo usuario o no.  





