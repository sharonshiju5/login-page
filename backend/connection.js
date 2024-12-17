import mongoose from "mongoose";



export default async function connetion(){
    const db=await mongoose.connect(process.env.Db_URL+process.env.DB_NAME);
    console.log("database connected");
    return db
}