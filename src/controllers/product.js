const { matchedData } = require('express-validator');
const {handleHttpError } = require('../utils/handleErrors');
const productModel = require('../models/nosql/product');
const fs = require('fs');
const PUBLIC_URL = process.env.PUBLIC_URL;



const createProduct = async (req, res) =>{
   try {


    console.log(req.body);
    console.log(req.file);
  

    const {name, price, description} = req.body;
    const priceToFloat = parseFloat(price);
    console.log(req.body);
    
    const newProduct = {
        name: name,
        price: priceToFloat,
        description: description,
        imageUrl: `${PUBLIC_URL}/${req.file.filename}`
    }

    const data = await productModel.create(newProduct);
    res.status(201).send(data);
       
     

   } catch (error) {
 handleHttpError(res, "error to create product")
   }
}


const getProducts = async(req,res)=>{
     try {
         const data = await productModel.find();
         res.send(data);
     } catch (error) {
      handleHttpError(res,"error to get products");
     }
}


const getOneProduct = async(req,res)=>{
try {
    const {id} = req.params;
    console.log(id); 
    const product = await productModel.findById({_id:id});
    
    if(!product){
       handleHttpError(res,"no existe el producto");
    }

    res.status(200).send(product);

} catch (error) {
  handleHttpError(res,"error to find producto");
}
}




module.exports = {createProduct, getProducts, getOneProduct}