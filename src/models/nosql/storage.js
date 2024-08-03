const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const storageSchema = new mongoose.Schema(
    {
       
        url: {
            type:String
              },
          filename:{
           type:String
             },
       
    },

    {
     timestamps: true //este nos sirve para registrar fechas de createdAt y updateAt
    }


);

storageSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
module.exports = mongoose.model('storage', storageSchema);


