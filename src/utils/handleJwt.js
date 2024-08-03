const jsonwebtoken = require('jsonwebtoken');
const JWT_KEYSECRET =  process.env.JWT_KEYSECRET;

const tokenSign = async (user) =>{
  const sign = await jsonwebtoken.sign({
     _id: user.id,
     role : user.role
  },
   JWT_KEYSECRET,
  {
    expiresIn: "10m"
  }
   
)

return sign ;
};

const verifyToken = async (token)=>{

    try {
        return jsonwebtoken.verify(token, JWT_KEYSECRET);
    } catch (error) {
        return null;
    }
}


module.exports = {tokenSign, verifyToken};