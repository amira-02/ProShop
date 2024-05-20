import mongoose from 'mongoose';

const ClaimSchema = new mongoose.Schema({
  Repairer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    // required: true
  },
  Order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  indexProduct: {
    type: Number,
    required: true
  },
  description: {  
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved', 'Rejected', 'Refund'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
const Claim = mongoose.model('Claim', ClaimSchema);
export default Claim;