/*
    Route: /api/users
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields')
const { createUser, getUsers } = require('../controllers/users');

const router = Router();

router.get('/', getUsers);
router.post('/',
    [
        check('name', ' Name required').not().isEmpty(),
        check('password', ' Password required').not().isEmpty(),
        check('email', ' Email required').isEmail(),
        validateFields
    ], 
    createUser
);



module.exports = router;