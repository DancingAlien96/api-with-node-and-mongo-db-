const { matchedData } = require('express-validator')
const userModel = require('../models/nosql/usersmodel')
const {handleHttpError } = require('../utils/handleErrors');
const {encrypt, compare} = require('../utils/handlePassword');
const {tokenSign} = require('../utils/handleJwt'); 
const PUBLIC_URL = process.env.PUBLIC_URL;
const productModel = require('../models/nosql/product');
const getOneUser = async (req,res) => {
   

     try {
          const id = req.params.id
          console.log(id);
          const user = await userModel.findById(id)
          
          res.status(200).send(user);
          
     } catch (error) {
          handleHttpError(res, "ERROR TO GET ONE USER");          
     }
     

}


const getUsers = async (req, res) =>{

     try {
          const userList = await userModel.find({}, "-password");

          res.send(userList);      
    
     } catch (error) {
     handleHttpError(res, "ERROR TO FIND USERS");          
     }
    //en este caso no se puede puede mostrar el password por obvias razones
     


}


const registerUser = async (req, res)=>{
    //! forma antigua de validar datos ahora se usara un validador para crear un User
     /*
     const {name,age, email, password, role} = req.body
     
     if(!name|| !age || !email || !password || !role){
          return res.status(400).json({message:"todos los campos son requeridos"})
     }*/
     //console.log(req.body);
     
     try {
          const {file} = req;
          const dataUser = matchedData(req, { locations: ['body'] });
          const passwordUserEncrypted = await encrypt(dataUser.password);
          const {age} = dataUser;
          const convertionAge = parseInt(age);        
          /** hice nuevo objeto para meter el password encriptado */ 
          const newUser = {
               name: dataUser.name,
               email: dataUser.email,
               password: passwordUserEncrypted,
               age: convertionAge,
               role: dataUser.role,
               avatar: `${PUBLIC_URL}/${file.filename}`
          };

     const createNewUser = await userModel.create(newUser);
     //** para no enviar el password se hace lo siguiente */
     //createNewUser.set("password", undefined , {strict: false});
     
     /*const userToken = {
          token: await tokenSign(newUser),
          user: newUser
     }   
          de momento no hallo necesario devolver el usuario creado con un token 
     */
     

     //** lo creo normal para la base de datos pero para mi response es con token */
     res.status(201).send(createNewUser);  
    
     } catch (error) {
          console.log(error);
 handleHttpError(res, "ERROR TO CREATE A USER");
     }
}


const deleteUser = async (req,res) =>{
   try {
        const id = req.params.id;
        const deletedUser = await userModel.delete({_id:id});
        res.send(deletedUser);
   } catch (error) {
     handleHttpError(res, "ERROR TO DELETE THIS USER");
   }
}

const loginUser = async(req,res)=>{
     try {
                    
          const dataLoginUser = matchedData(req, { locations: ['body'] });//lo que recibo del usuario
           console.log(dataLoginUser);
          const user = await userModel.findOne({email: dataLoginUser.email}) // .select("password")analizo la bd y pido permiso para obtener el password
          
          if(!user){ //compruebo si existe el usuario 
          return handleHttpError(res, "NOT EXISTS USER", 404);
          }          
         //console.log(user.password);
        const passwordUserEncrypted = user.password; //si existe guardo el password encryptado
           const check = await compare(dataLoginUser.password, passwordUserEncrypted); //comparo passwords

        if(!check){ //si no es valida hago esto 
          return handleHttpError(res, "PASSWORD INVALID", 401);
        }
   

        
       const userToken = { //devuelvo el objeto junto con el token 
          token:await tokenSign(user),
          user: {
               id: user._id,
               name: user.name,
               email: user.email,
               role : user.role,
               avatar: user.avatar
          }
       }
        
     res.status(200).send(userToken);
     } catch (error) {
          console.log(error);
      handleHttpError(res, "ERROR TO TRY LOGIN");          
     }
}



const updateUser = async (req, res) =>{
  try {
     const dataUser = matchedData(req, { locations: ['body'] });
     const id = req.params.id;
     const updatedUser = await userModel.findOneAndUpdate({_id:id}, dataUser, { new: true } );
     res.send(updatedUser);
  } catch (error) {
     handleHttpError(res, "ERROR TO UPDATE THIS USER");
  }
}


const addFavorites = async (req,res)=>{
     try {
          const {id}  = req.params;
          console.log(`id del usuario ${id}`);
          const {productId} = req.body;
          console.log(`id del product ${productId}`);
          const userFound = await userModel.findById({_id:id});
          if(!userFound){
               handleHttpError(res,'user not found');
          }

           await userModel.findByIdAndUpdate(
               id,
               { $addToSet: { favoritesIds: productId } }, 
               { new: true } 
           );          
          

           res.send(userWithFavorites);





     } catch (error) {
     handleHttpError(res, "error to add favorite");          
     }
}


const getFavorites = async (req, res) => {
     try {
         const { id } = req.params;
 
         const user = await userModel.findById(id);
         if (!user) {
          handleHttpError(res, 'error to find this user')
     }
 
         const favoriteProducts = await productModel.find({ _id: { $in: user.favoritesIds } });
 
         res.status(200).send(favoriteProducts);
     } catch (error) {
          handleHttpError(res,"error to find favorites");
     }
 };

module.exports = {getUsers, registerUser, getOneUser, deleteUser, updateUser, loginUser, addFavorites, getFavorites};

