const sharp = require('sharp');
const {handleHttpError} = require('../utils/handleErrors')


const resizeImage = async (req,res,next ) =>{
   
     try {
      const{file} = req;
      const resizedFileName = `file-${Date.now()}.webp`;
      const resizedFilePath =`${__dirname}/../storage/${resizedFileName}`;
        
      await sharp(file.buffer)
            .webp()
            .resize(300) 
            .toFile(resizedFilePath);

        req.file.filename = resizedFileName;
        
       
        

        next();



     } catch (error) {
        console.log(error);
        handleHttpError(res, 'error to resize');
     }
   
  
  
  }
  
module.exports = {resizeImage}
  

