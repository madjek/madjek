import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())

app.listen(PORT, console.log(`Server runnng in ${process.env.NODE_ENV} on port ${PORT}`.bgGreen.black));
