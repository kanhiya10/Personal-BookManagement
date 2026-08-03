import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        console.log('see1',process.env.MONGODB_URI);
        console.log('see2',process.env.DB_NAME);
       const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
    }
    catch(error){
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

export default connectDB; 