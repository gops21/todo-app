import express from 'express';
import 'dotenv/config'
import mongoose from 'mongoose';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import allRoutes from './routes/index.js';

const app = express();
const PORT  = process.env.PORT || 8000;

// middleware
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api', allRoutes);

// error handler
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ message, stack: err.stack });
})

const connectDB = async () => {
  try{
    mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log('MongoDB Connected');
  }catch(err){
    console.log(err);
    process.exit(1);
  }
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});