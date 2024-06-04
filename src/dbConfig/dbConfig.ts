import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables manually

export async function connect() {
    try{
        console.log(process.env.MONGODB_URI);
        mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log("Database Connected")
        })

        connection.on('error', (err) => {
            console.log("Mongoose connection error. Please make sure MongoDB is running ",err );
            process.exit();
        })

    } catch (error){
        console.log("Something goes Wrong!");
    }
}