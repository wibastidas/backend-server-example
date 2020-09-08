

const createTransfer = (req, res) => {

    console.log(req.body);

    res.json({
        ok:true,
        msg: 'Creando transfer'
    })
}

module.exports = {
    createTransfer,
}