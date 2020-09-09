/*
    Route: /api/currencies
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/ validate-fields')

const { createCurrency, getCurrencies } = require('../controllers/currencies')


const router = Router();


router.get('/', getCurrencies);
router.post('/',
    [
        check('name', ' Name required').not().isEmpty(),
        check('code', ' Code required').not().isEmpty(),
        validateFields
    ], 
    createCurrency
);



module.exports = router;