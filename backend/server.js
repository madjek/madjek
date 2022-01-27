import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import db from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import movieRentRoutes from './routes/movieRentRoutes.js';

dotenv.config();
db();

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/movierent', movieRentRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server runnng in ${process.env.NODE_ENV} on port ${PORT}`.bgGreen.black
  )
);
