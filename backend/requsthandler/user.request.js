
import userSchema from "../moduls/user.model.js"
import bcrypt from "bcrypt"
import pkg from 'jsonwebtoken';
import nodemailer from "nodemailer"

const trasporter=nodemailer.createTransport({
    host:"sandbox.smtp.mailtrap.io.gmail.com",
    port:2525,
    secure:false,
    auth:{
        user:"a4d073e5a41a7d",
        pass:"806629f32474fe",
    },
})


const {sign} = pkg; 


export async function adduser(req,res) {
    const{username,email,password,cpassword,profile}=req.body
    console.log(username,email,password,cpassword);
    if(!(username&&email&&password&&cpassword&&profile))
        return res.status(404).send({msg:"feilds are empty"});
    if(password!=cpassword)
        return res.status(404).send({msg:"password not match"});
    const data=await userSchema.findOne({email})
    if(data)
        return res.status(404).send({msg:"email already exists"});
    const hpasssword= await bcrypt.hash(password,10)
console.log(hpasssword);
await userSchema.create({username,email,password:hpasssword,profile}).then(()=>{
    return res.status(201).send({msg:"succesfully created"});

}).catch((error)=>{
    res.status(500).send({error})
})
}


export async function loginUser(req,res) {
    const {email,password}=req.body
    if(!(email&&password))
        return res.status(404).send({msg:"feilds are empty"});
    const user=await userSchema.findOne({email})
    if(user==null)
        return res.status(404).send({msg:"email is not valid"});
    const succes=await bcrypt.compare(password,user.password)
    console.log(succes);
    const token= await sign({userID:user._id},process.env.JWT_KEY,
    {expiresIn:"24h"})
    res.status(200).send({msg:"success fully loged in",token});
}


export async function Home(req,res) {
   try {
    console.log("end point");
    
    console.log(req.user);
    const _id=req.user.userID;
    const user=await userSchema.findOne({_id})
    res.status(200).send({username:user.username,profile:user.profile})
   } catch (error) {
    res.status(400).send({error})
   }
    
}


export async function forgetPassword(req,res) {
    console.log(req.body);
    try {
        const info=await trsporter.sendMail({
            from:"rapetex461@chosenx.com",
            to:req.body.email,
            subject:"reset password",
            text:"click the link below to reset password",
            html:`<a href="http://localhost:3000/pages/forgetPassword.html">click here</a>`
        })
        console.log("message sent",info.messageId);
        res.send({msg:`message sent:%s ${info.messageId}`})
        
    } catch (error) {
        res.status(400).send({error})
    }
    
}