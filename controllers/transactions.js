

const getTransactions = (req, res) => {

    console.log(req.body);

    res.json({
        ok:true,
        transactions: [
        //     {
        //     accountFrom: 1,
        //     accountTo: 2,
        //     amount: 525,
        //     date: 12/12/2019,
        //     description: 'Pago',
        //     divisa: 'USD'
        // }
        ]
    })
}

const createTrasaction = (req, res) => {

    console.log(req.body);

    res.json({
        ok:true,
        msg: 'Creando transfer'
    })
}

module.exports = {
    getTransactions,
    createTrasaction
}