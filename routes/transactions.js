/*
    Route: /api/transactions
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/ validate-fields')

const { getTransactions, createTrasaction } = require('../controllers/transactions')
const { validarJWT } = require('../middlewares/validate-jwt');

const router = Router();


router.get('/', validarJWT ,getTransactions);
router.post('/', validarJWT, 
    [
        check('accountFrom', ' Account required').not().isEmpty(),
        check('accountTo', ' Account required').not().isEmpty(),
        check('amount', ' Amount required').not().isEmpty(),
        validateFields
    ], 
    createTrasaction
);

module.exports = router;