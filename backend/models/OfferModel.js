import mongoose from 'mongoose';

const { Schema } = mongoose;

const OfferSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  pricePerDay: {
    type: Number,
    required: true,
  },
  terms: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'unavailable'],
    default: 'available',
  },
}, { timestamps: true });

const Offer = mongoose.model('Offer', OfferSchema);

export default Offer;
