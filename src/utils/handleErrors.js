const handleHttpError  = (res, message = "algo ha sucedido",  code = 403) =>{
         
    res.send({message: `${message}`}).status(code);
}


//! ojo con estas situaciones yo estaba exportando el handleHttpError sin llaves entonces no reconocia la funcion
//!pensando que por ser solo una funcion no eran necesarias pero si lo son

module.exports = {handleHttpError};