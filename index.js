const express = require("express");

const app = express();

app.use(express.json());


app.get("/",(req,res)=>{
    return res.status(200).send("This is practice backend");
})

app.get("/ping",(req,res)=>{
    return res.status(200).send("pong");
})

let user = [
    {id:1,username:"Sandeep",email:"s@gmail.com",password:"123456789",dob:"1/1/1930"}
]

app.get("/users",(req,res)=>{
    try {
        return res.status(200).send({message:"sucessfully",user})
    } catch (error) {
        return res.status(500).send({message:"something went wrong"});
    }
})


app.post("/createuser",(req,res)=>{
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

        user.push({
            username,email,password,dob,id:user.length+1
        })

        return res.status(201).send({message:"user created sucessfully"})

    } catch (error) {
        return res.status(500).send({message:"something went wrong"});
        
    }
})



app.listen(8080,()=>{
    console.log("connected to server sucessfully")
})