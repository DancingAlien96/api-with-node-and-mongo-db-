const {handleHttpError} = require('../utils/handleErrors');


const checkRole =(roles)=> (req,res,next)=>{
    
       
try {
    const {user} = req;

        const rolesByUser = user.role 

        const checkValuesRole = roles.some((roleSingle) => rolesByUser.includes(roleSingle) );
        if(!checkValuesRole){
            return handleHttpError(res, "USER NOT PERMISIONS");
        }
       next();

} catch (error) {
    handleHttpError(res, "ERROR PERMISIONS");
}
}

module.exports = {checkRole}