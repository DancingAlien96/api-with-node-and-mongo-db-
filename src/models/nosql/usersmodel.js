const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const userSchema = new mongoose.Schema(
    {
       
        name: {
            type:String
              },
        age:{
           type:Number
             },
        email:{
            type:String,
            unique:true
        },
        password:{
            type:String,
          // select: false //**para evitar que el password sea mostrado en el front se puede aplicar esto */
        }, 
        role:{
            type:["user", "admin"],
            default: "user"
        },
        avatar:{
            type:String
        },
        favoritesIds:[{
            type: mongoose.Types.ObjectId,
             ref: 'products'
        }]
    },

    {
     timestamps: true //este nos sirve para registrar fechas de createdAt y updateAt
    }


);

userSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
module.exports = mongoose.model('user', userSchema);


