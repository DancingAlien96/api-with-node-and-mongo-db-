const {check} = require('express-validator');
const {validatorResults} = require('../utils/handleValidator');


const ValidatorFieldsTracks = [
  check("name").exists().notEmpty().isLength({min:5, max:90}),
  check("album").exists().notEmpty().isLength({min:2, max:100}),
  check("cover").exists().notEmpty().isLength({min:5, max:100}),
  check("artist").exists().notEmpty(),
  check("artist.name").exists().notEmpty().isLength({min:5, max:100}),
  check("artist.nickname").exists().notEmpty().isLength({min:2, max:100}),
  check("artist.nationality").exists().notEmpty().isLength({min:5, max:100}),
  check("duration").exists().notEmpty(),
  check('duration.start').isNumeric().withMessage('Duration start must be a number').notEmpty().withMessage("debe llenarse este campo"),
  check('duration.end').isNumeric().withMessage('Duration start must be a number'),
  check("mediaId").exists().notEmpty().isMongoId(),
  (req,res,next)=> validatorResults(req,res,next)
  
];

const ValidatorGetTrack = [
  check("id").exists().notEmpty().isMongoId(),
  (req,res,next)=> validatorResults(req,res,next)
  
];







module.exports = {ValidatorFieldsTracks, ValidatorGetTrack}