const {check} = require('express-validator');
const {validatorResults} = require('../utils/handleValidator');


const validatorFieldsCar = [
    check("client").isMongoId().exists().notEmpty(),
    check("products").exists().notEmpty(),
    check("products.product").isMongoId().exists().notEmpty(),
    check("products.quantity").isNumeric().notEmpty().exists(),
    (req,res,next)=> validatorResults(req,res,next)

]


module.exports = {validatorFieldsCar};
