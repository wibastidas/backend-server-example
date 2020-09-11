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
`GET   /api/users`
Obtiene todos los usuarios de la base de datos.  

#### Login
`POST  /api/login`
Valida las credenciales del usuario y devuelve un token para futuras operaciones  

#### Currencies
`POST  /api/currencies`
Crea una divisa en la base de datos.  
`GET     /api/currencies`
Obtiene todos las divisa de la base de datos.  

#### Accounts
`POST  /api/accounts`
Crea una cuenta en la base de datos.  
`GET     /api/accounts`
Obtiene todos las cuentas de la base de datos.   

#### Transactions
`GET    /api/transactions`
Obtiene las transacciones para el usuario logueado, opcionalmente se puede filtrar por un rango de fechas e incluso por identificador de cuenta origen.  
`POST  /api/transfer`
Realiza la transferencia entre una cuenta de origen y una cuenta destino, las cuentas pueden ser del mismo usuario o no.  