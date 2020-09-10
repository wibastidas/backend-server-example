

const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    //leer token
    const token = req.header('x-token');

    //console.log(token);

    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try { 

        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        console.log("id: ", id);

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