import mongoose from "mongoose";
import "dotenv/config";

const mongoUrl= process.env.MONGO_URL

async function connectDB() {
    try{
        await mongoose.connect(mongoUrl)
        console.log('database connected')
    } catch (error){
        throw new Error (`Error connect the Data Base: ${error.message}`)
    }
}

export default connectDB