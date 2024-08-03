const { error } = require('console');
const storageModel = require('../models/nosql/storage');
const PUBLIC_URL = process.env.PUBLIC_URL;
const {handleHttpError} = require('../utils/handleErrors');
const fs = require('fs');
const MEDIAPATH = `${__dirname}/../storage`;

const createFile =  async (req, res) => {
       
      try {
        const {file} = req 
        console.log(file);
    //objeto con propiedades del esquema a crear 
        const fileObject = 
        {
            
        filename: file.filename,
        url: `${PUBLIC_URL}/${file.filename}`
        }

    const data = await storageModel.create( fileObject )
    res.status(201).send(data)
    //console.log(data) 
      } catch (error) {
        }
       
 }


const getFile = async (req,res) =>{
    try {
        const id = req.params.id;
        const foundFile = await storageModel.findById({_id:id});
        res.send(foundFile);


    } catch (error) {
        handleHttpError(res, "ERROR TO GET THIS FILE");
    }
}


const getFiles = async ( req, res) =>{
     
    try {
        const files = await storageModel.find();
        res.send(files);
      
    } catch (error) {
        handleHttpError(res,"ERROR TO GET FILES");    
    }

}


const deleteFile = async (req,res) =>{
    try {
   //! ok aca sucede algo raro si en dado caso quiero eliminar el archivo en la carpeta debo eliminar el registro de la base de datos con deleteOne
        const id = req.params.id;
        const deletedFile  = await storageModel.delete({_id:id});
       // const {filename} = foundFile;
        //const filepath = `${MEDIAPATH}/${filename}`;
      
       /*fs.unlinkSync(filepath);
         const data = {
            filePath,
            deleted:1
         }
        */

        res.send(deletedFile);
    } catch (error) {

handleHttpError(res, "ERROR TO DELETE FILE");
    }
}




 module.exports = {createFile,getFiles, getFile, deleteFile};