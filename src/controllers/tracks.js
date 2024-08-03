const { matchedData } = require('express-validator');
const tracksModel = require('../models/nosql/tracks');
const handleHttpError = require('../utils/handleErrors');


const getTracks = async (req,res) => {
    try {
         const userFound = req.user;
         const tracks = await tracksModel.find({});
   
     
        res.send({tracks, userFound});
    
    } catch (error) {
        return handleHttpError(res, "ERROR TO GET TRACKS");
    }

}


const createTracks = async (req,res) => {
    



    try {
        //**aca es una practica limpiar lo que viene del cliente con matchdata  */
        const bodyCleaned = matchedData(req.body)
        const newTrack  = await tracksModel.create(bodyCleaned);

        res.send(newTrack);
         
    } catch (error) {
       handleHttpError(res, "ERROR TO CREATE TRACK ");        
    }
  
  
}


const getTrack  =  async (req, res) =>{
     try {
        const id = req.params.id
        const foundTrack = await tracksModel.findById(id);
        res.send(foundTrack);
           
    } catch (error) {
        handleHttpError(res,"ERROR TO FIND THIS TRACK");
    }
}


const updateTrack = async (req, res)=>{
     try {
        
        const id = req.params.id;
        //**cosas que he aprendido es a hacer una variable de este modo al utilizar matchedData() */
        const dataTrack = matchedData(req, { locations: ['body'] });
        

        //**no me funcionaba por que tengo que declarar la busqueda de esta forma con respecto al findOneAndUpdate() de mongo*/
        const updatedTrack = await tracksModel.findOneAndUpdate({ _id: id }, dataTrack, { new: true });
        res.send(updatedTrack);
        


           
    } catch (error) {
        handleHttpError(res, "ERROR TO UPDATE THIS TRACK");
    }
}

const deleteTrack = async (req, res) =>{


  try {
    
    
    const id = req.params.id;

    //**en este caso usa deleteOne que es un metodo propio de mongo pero si se quiere usar un borrado nomas logico es delete  */
    //const foundTrack = await tracksModel.deleteOne({_id:id})
    
    const foundTrack = await tracksModel.delete({_id:id})



    
    res.send({foundTrack}).json({message: "deleted successfull"})



  } catch (error) {
     handleHttpError(res,"ERROR TO DELETE THIS TRACK");
  }


}






module.exports = {getTracks, createTracks, updateTrack, getTrack, deleteTrack}