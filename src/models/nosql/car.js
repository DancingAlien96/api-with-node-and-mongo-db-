const mongoose = require('mongoose');

const carSchema = moongoose.Schema(
    {
        
          products: [{
            product: {
              type: Schema.Types.ObjectId,
              
              required: true
            },
            quantity: {
              type: Number,
              required: true
            }
          }],

        total: {
            type:Number,
            required: true
        }
      
},
{
    timestamps: true //este nos sirve para registrar fechas de createdAt y updateAt
   }





)
    
  module.exports = mongoose.model("car",carSchema );
  