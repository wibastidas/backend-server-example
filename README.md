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
Valida las credenciales del usuario utilizando bcrypt para comparar la contraseña enviada por el usuario con la constreña encriptada de la base de datos y devuelve un JSON Web token necesario para realizar `transactions` en la aplicación.  

#### Currencies
`POST  /api/currencies`
Crea una divisa en la base de datos.  Recibe name y code.  
`GET     /api/currencies`
Obtiene todos las divisa de la base de datos.  

#### Accounts
`POST  /api/accounts`
Crea una cuenta en la base de datos.  
El Schema `Account` tiene una referencia del Schema `User` para relacionar con usuario pertenece la cuenta. (En este caso el usuario que la creo).  
El Schema `Account` tiene una referencia del Schema `Currency` para relacionar con la informacion de la divisa.  
`GET     /api/accounts`
Obtiene todos las cuentas de la base de datos.   

#### Transactions
`GET    /api/transactions`
Obtiene las transacciones para el usuario logueado, opcionalmente se puede filtrar por un rango de fechas e incluso por identificador de cuenta origen.  
`POST  /api/transfer`  
Realiza la transferencia entre una cuenta de origen y una cuenta destino, las cuentas pueden ser del mismo usuario o no.   
El Schema `Transaction` tiene una referencia del Schema `Account` para relacionar con la informacion de las cuentas de origen y destino.  
El Schema `Transaction` tiene una referencia del Schema `User` para saber el usuario que realizo la transaction.  

### Base de datos
Para trabajar con base de datos se utilizó Mongo Atlas, el cual es una base de datos Mongo en la nube y  ofrece hasta 500MB de almacenamiento en su version gratuita.

### Conversión de divisa 
Para convertir de una divisa a otra se creo una funcion que recibe fromCurrency, toCurrency y amount. 
fixer.io tiene endpoint para convertir de una divisa a otra pero el mismo solo esta disponible en su versión de pago.
La alternativa fue utilizar el enpoint disponible en la versión gratuita que nos permite obtener el último tipo de cambio para todas las divisas disponibles en base al Euro y a partir de este dato realizar los calculos. 


### Mejoras
Por limitaciones de tiempo las siguientes features no fueron implementadas:
Paginar resultado de busqueda para el enpoint GET transactions.
Validar que no exista el email del usuario que se esta registrando en la base de datos. 
Permiter hacer CRUD de users, account, currency...
Validar que el getAccounts solo devuleva las cuentas del usuario logeado.
Guardar un estatus de la transaccion y si falla poder retomar la misma. 
Agregar Validaciones en general.