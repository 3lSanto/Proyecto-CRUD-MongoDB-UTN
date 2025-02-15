import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import connectDB from './src/db/connection.js';

dotenv.config();

//Routes
import userRoutes from './src/routes/userRoutes.js';
import categoryRoutes from './src/routes/categoryRoutes.js';
import productRoutes from './src/routes/productRoutes.js';
import authRoutes from './src/routes/authRoutes.js';

//Environment Variables
const PORT = process.env.PORT || 3000;
const API_VERSION = process.env.API_VERSION || 'v1';
const API = `/api/${API_VERSION}`;

//Initialize Express
const app = express();
app.use(morgan('dev'));
app.use(express.json())
app.use(cookieParser());

//Use Routes
app.use(`${API}`, userRoutes);
app.use(`${API}`, categoryRoutes);
app.use(`${API}`, productRoutes);
app.use(`${API}`, authRoutes);

//Connect to MongoDB
connectDB();

//Start Server
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
   console.log(`Visit http://localhost:${PORT}/`);
});

  process.on('SIGINT', async () => { 
    dbClient.cerrarConexion(); 
    process.exit(0);
});