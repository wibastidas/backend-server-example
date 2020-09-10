/*
    Route: /api/login
*/

const { Router } = require('express');
const { login } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields')
const { check } = require('express-validator');

const router = Router();


router.post('/',
    [
        check('name', ' Name required').not().isEmpty(),
        check('password', ' Password required').not().isEmpty(),
        check('email', ' Email required').isEmail(),
        validateFields
    ], 
    login
);

module.exports = router;