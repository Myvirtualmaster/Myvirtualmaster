// Importing required components and libraries
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser  from 'cookie-parser';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';
import apiRoutes from './routes/index.js';

// Load env variables
dotenv.config();

// Connect to MongoDB
 await connectDB();

// Initialize app 
const app = express();

// Middlerware 
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api', apiRoutes);

app.get('api/heath', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API running 🚀'});
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => 
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode `)
);
