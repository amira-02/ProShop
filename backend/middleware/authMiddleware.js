import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';


// User must be authenticated
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from the 'jwt' cookie 
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select('-password');
      

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// User must be an admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

// const admin = (req, res, next) => {
//   // Assurez-vous que req.user est défini
//   if (!req.user) {
//     res.status(401);
//     throw new Error('Not authorized');
//   }

//   // Vérifiez si l'utilisateur est un administrateur
//   if (req.user.isAdmin) {
//     next();
//   } else {
//     // Vérifiez si l'utilisateur est une société d'assurance
//     if (req.user.Type === 'InsuranceCompany') {
//       next();
//     } else {
//       // Vérifiez si l'utilisateur est une société de réparation
//       if (req.user.Type === 'RepairerCompany') {
//         next();
//       } else {
//         // Vérifiez si l'utilisateur est un propriétaire de boutique
//         if (req.user.Type === 'ShopOwner') {
//           next();
//         } else {
//           res.status(401);
//           throw new Error('Not authorized');
//         }
//       }
//     }
//   }
// };

const insuranceCompany = (req, res, next) => {
  // Assurez-vous que req.user est défini
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized');
  }

  // Vérifiez si l'utilisateur est une compagnie d'assurance
  if (req.user.Type === 'insurance') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an insurance company');
  }
};





export { protect, admin ,insuranceCompany};
