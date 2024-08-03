const {check} = require('express-validator');
const {validatorResults} = require('../utils/handleValidator');




const validatorFieldsUser = [
    check("name").exists().notEmpty().isLength({min:2, max:20}),
    check("age").exists().isNumeric().withMessage("this field is not a number"),
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength({min:6, max:15}),

    (req,res,next)=> {return validatorResults(req,res,next)} 
];

const validatorLoginUser = [
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength({min:6, max:15}),

    (req,res,next)=> {
        return validatorResults(req,res,next)}
]

const validatorGetUser = [
    check("id").notEmpty().exists().isMongoId(),

    (req,res,next)=> {return validatorResults(req,res,next)}
];



module.exports = {validatorFieldsUser, validatorGetUser, validatorLoginUser};