import mongoose from 'mongoose';

const policySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    required: true,
    // enum: ['life', 'health', 'auto', 'home', 'travel'], // Exemple de types de police, vous pouvez ajouter d'autres types selon vos besoins
  },
  terms: {
    type: String,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Policy = mongoose.model('Policy', policySchema);
export default Policy;

