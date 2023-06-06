require('dotenv').config();
import express from 'express';	
import mongoose from 'mongoose';

const app = express();
app.use(express.json())

const PORT = process.env.PORT || 3000;

/** Connect to database */
async function connect() {
    try {
        const URI:string = process.env.MONGODB_URI as string
        mongoose.set("strictQuery", false)
        await mongoose.connect(URI)
        console.log("Connected to database")
    } catch (error) {
        
    }
}
connect()

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

import authRoutes from './src/routes/auth';
app.use('/api/auth', authRoutes);

/** start server */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

export default app