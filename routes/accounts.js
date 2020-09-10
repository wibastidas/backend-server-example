/*
    Route: /api/accounts
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields')
const { validarJWT } = require('../middlewares/validate-jwt');

const { createAccount, getAccounts } = require('../controllers/accounts')


const router = Router();


router.get('/', validarJWT, getAccounts);
router.post('/', validarJWT, 
    [
        check('account_number', ' Account Number required').not().isEmpty(),
        check('balance', ' Balance required').not().isEmpty(),
        check('currency_id', ' Currency Id required').not().isEmpty(),
        validateFields
    ], 
    createAccount
);



module.exports = router;