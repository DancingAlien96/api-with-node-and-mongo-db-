const {check} = require('express-validator');
const {validatorResults} = require('../utils/handleValidator');




const validatorFieldsProduct = [
    check("name").exists().notEmpty().isLength({min:2, max:26}).withMessage("size too long"),
    check("price").exists().isNumeric().withMessage("this field is not a number"),
    check("description").exists().notEmpty().isLength({max:80}),
    
    (req,res,next)=> {return validatorResults(req,res,next)} 
];


module.exports = {validatorFieldsProduct};