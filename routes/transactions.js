/*
    Route: /api/transactions
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { getTransactions, createTrasaction } = require('../controllers/transactions')


const router = Router();


router.get('/', getTransactions);
router.post('/',
    [
        check('accountFrom', ' Account required').not().isEmpty(),
        check('accountTo', ' Account required').not().isEmpty(),
        check('amount', ' Amount required').not().isEmpty()
    ], 
    createTrasaction
);



module.exports = router;