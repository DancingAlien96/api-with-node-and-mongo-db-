const bcryptjs = require('bcryptjs');

const encrypt = async (password) =>{
const hash = await bcryptjs.hash(password,10);
    return hash;

};


const compare = async (password, passwordEncrypt) =>{
    const comparation = await bcryptjs.compare(password, passwordEncrypt);
    return comparation;

}


module.exports = {encrypt, compare};