const express = require("express");

const app = express();

app.use(express.json());

const dotenv = require("dotenv");

const mongoose = require("mongoose");

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;

const userModel = require("./userSchema");




app.get("/",(req,res)=>{
    return res.status(200).send("This is practice backend");
})

app.get("/ping",(req,res)=>{
    return res.status(200).send("pong");
})


app.get("/users",async(req,res)=>{
    try {
        const users = await userModel.find();
        return res.status(200).send({message:"sucessfully",users})
    } catch (error) {
        return res.status(500).send({message:"something went wrong"});
    }
})


app.post("/createuser",async(req,res)=>{
    try {
        const {username,email,password,dob} = req.body;

        if(!username){
            return res.status(400).send({message:"username can not be empty"});
        }

        if(!email){
            return res.status(400).send({message:"email can not be empty"});
        }

        if(password.length<8 || password.length>16){
            return res.status(400).send({message:"pass length should be gtr 8 and lst 16"});
        }

        console.log(dob,new Date(dob));

        const user = await new userModel({
            username,
            email,
            password,
            dob:new Date(dob)
        })

        await user.save();


        return res.status(201).send({message:"user created sucessfully",user})

    } catch (error) {
        return res.status(500).send({message:"something went wrong"});
        
    }
})





mongoose.connect(MONGODB_URL)
.then(()=>{
    app.listen(8080,()=>{
        console.log("connected to server sucessfully")
    })
})
.catch((err)=>{
    console.log(err);
    console.log("Error connecting to mongodb");
})

