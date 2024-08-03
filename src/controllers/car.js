const {handleHttpError} = require('../utils/handleErrors');

const createBuy = async (req,res)=>{
    try {
        const {client, products} = req.body;    
                

        res.status(201);
    } catch (error) {
    handleHttpError(res,"error to create buy")        
    }
}

module.exports = {createBuy};
