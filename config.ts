require('dotenv').config();
import mongoose from "mongoose";

/** Connect to database */
export async function connect() {
    try {
        const URI:string = process.env.MONGODB_URI as string
        mongoose.set("strictQuery", false)
        await mongoose.connect(URI)
        console.log("Connected")
    } catch (error) {
        console.log("Failed to connect to database")
    }
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));