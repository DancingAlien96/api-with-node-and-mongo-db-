const {check} = require('express-validator');
const {validatorResults} = require('../utils/handleValidator');



const validatorGetFile = [
   check("id").exists().notEmpty().isMongoId(),
   (req,res,next)=> validatorResults(req,res,next)

];


module.exports = {validatorGetFile};