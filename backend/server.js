import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import insurance_companyRoutes from './routes/insurance_companyRoutes.js';
import RepairerCompanyRoutes from './routes/RepairerCompanyRoutes.js';
import ShopRoutes from './routes/ShopRoutes.js'; 
import OfferRoutes from './routes/OfferRoutes.js' 
import PolicyRoutes from './routes/PolicyRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import ClaimRoutes from'./routes/ClaimRoutes.js' 
dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/InsuranceCompany', insurance_companyRoutes);
app.use('/api/RepairerCompany',RepairerCompanyRoutes);
app.use('/api/Shop', ShopRoutes);
app.use('/api/Offer', OfferRoutes);
app.use('/api/Policy', PolicyRoutes);
app.use('/api/Claim', ClaimRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use('/uploads', express.static('/var/data/uploads'));
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  const __dirname = path.resolve();
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
