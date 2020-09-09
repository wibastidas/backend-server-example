

const validarJWT = (req, res, next) => {

    //leer token
    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    console.log(token);

    try { 

        //aca deberiamos validar el token enviado sea correcto
        next();
        
    } catch {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
}

module.exports = { 
    validarJWT
}