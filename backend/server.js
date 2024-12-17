import express from "express"
import env from "dotenv"
import connection from "./connection.js";
import router from "./router.js";
import userModel from "./moduls/user.model.js";
env.config()


const app=express();
app.use(express.static("../frontend"))
app.use(express.json())
app.use("/api",router)
connection().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`server started on http://localhost:${process.env.PORT}`);
        
    })
})