import mongoose from 'mongoose';

const policySchema = new mongoose.Schema({
  CompanyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InsuranceCompany',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  EndDate: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    required: true,
  },
  terms: {
    type: String,
    required: true,
  },
});

const Policy = mongoose.model('Policy', policySchema);
export default Policy;