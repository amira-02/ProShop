import mongoose from 'mongoose';

const ShopSchema = mongoose.Schema(
    {
      
      name: {
        type: String,
        required: true,
      },
       address: {
          type: String,
          required: true,
        }, 
        email: {
          type: String,
          required: true,
        },
        password: {
          type: String,
          required: true,
        },
       
        contact: {
          type: String,
          required: true,
        },

    
    },
    {
      timestamps: true,
    }
  );

  const Shop = mongoose.model('Shop', ShopSchema);

  export default Shop;
