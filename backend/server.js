import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import colors from 'colors';
import db from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import movieRentRoutes from './routes/movieRentRoutes.js';
import ecommerceRoutes from './routes/ecommerceRoutes.js';
import cryptoinfoRoutes from './routes/cryptoInfoRoutes.js';

dotenv.config();
db();

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/movierent', movieRentRoutes);
app.use('/api/ecommerce', ecommerceRoutes);
app.use('/api/cryptoinfo', cryptoinfoRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server runnng in ${process.env.NODE_ENV} on port ${PORT}`.bgGreen.black
  )
);
