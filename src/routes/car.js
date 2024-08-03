const express = require('express');
const router = express.Router();
const {createBuy} = require('../controllers/car');


router.post('/', createBuy);




module.exports = router;