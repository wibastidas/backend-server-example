/*
    Route: /api/transactions
*/

const { Router } = require('express');
const { getTransactions, createTrasaction } = require('../controllers/transactions')


const router = Router();


router.get('/', getTransactions);
router.post('/', createTrasaction);



module.exports = router;