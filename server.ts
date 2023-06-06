import express, { Express } from 'express';	
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

/** Load env variabled from .env file */
dotenv.config();

const app : Express = express();
app.use(express.json())

const PORT = process.env.PORT || 5000;

/** Connect to database */
async function connect() {
    try {
        const URI = process.env.MONGODB_URI
        mongoose.set("strictQuery", false)
        await mongoose.connect(URI)
        console.log("Connected to MongoDB")
    } catch (error) {
        
    }
}

connect()

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));
db.once('open', () => {
    console.log('Connected to MongoDB')
});

import authRoutes from './src/routes/auth';
app.use('api/auth', authRoutes);

/** start server */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});