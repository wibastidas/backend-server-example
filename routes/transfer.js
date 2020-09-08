/*
    Route: /api/transfer
*/

const { Router } = require('express');
const { createTransfer } = require('../controllers/transfer')


const router = Router();


router.post('/', createTransfer);



module.exports = router;