const mongoose = require("mongoose");
const mongooseDelete = require('mongoose-delete');



const productSchema = new mongoose.Schema(
    {
     
        name: {
            type:String
        },

          price:{
            type:Number,
            
          },
          description:{
            type:String, 
            required:true
          },
          
            imageUrl: {
                type: String,
                
              }, 

              
          
        

    },
    {
        timestamps: true //este nos sirve para registrar fechas de createdAt y updateAt
       }



)



productSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
module.exports = mongoose.model("Product", productSchema)
