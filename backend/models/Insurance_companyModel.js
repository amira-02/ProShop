import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

<<<<<<< HEAD
const InsuranceCompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    isInsuranceCompany: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt password before saving to database
InsuranceCompanySchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to match entered password with hashed password in the database
InsuranceCompanySchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const InsuranceCompany = mongoose.model('InsuranceCompany', InsuranceCompanySchema);

export default InsuranceCompany;
=======
// const reviewSchema = mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     rating: { type: Number, required: true },
//     comment: { type: String, required: true },
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: 'User',
//     },
//   },
//   {
//     timestamps: true,
//   } 
// );

const InsuranceCompanySchema = mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: 'User',
    // },
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

const InsuranceCompany = mongoose.model('InsuranceCompany', InsuranceCompanySchema);

export default InsuranceCompany;
>>>>>>> 91dafd5fe994523b97f0969093cd762c7081997c
