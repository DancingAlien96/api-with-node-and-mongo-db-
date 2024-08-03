const {handleHttpError} = require('../utils/handleErrors');
const { verifyToken } = require('../utils/handleJwt');
const userModel = require('../models/nosql/usersmodel');



const authMiddleWare = async (req, res, next) => {

   try {
       if(!req.headers.authorization){
         return handleHttpError(res, "NO TOKEN", 401 );
         
       }
       const token = req.headers.authorization.split(' ')[1];
       const dataToken = await verifyToken(token);
         
       if(!dataToken._id){
       return handleHttpError(res, "ERROR ID TOKEN");
        
       }
       const userFound = await userModel.findById({_id:dataToken._id}, "-password");
       req.user = userFound;
       
       next();

     
   } catch (error) {
      console.log(error);
      handleHttpError(res, "ERROR IN SESSION");
   }
}


module.exports = {authMiddleWare};