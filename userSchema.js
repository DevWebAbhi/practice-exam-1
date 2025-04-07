const mongoose = require("mongoose");

const schema = mongoose.Schema({
    username:{type:String, required:true,trim:true},
    email:{type:String, required:true,unique:true},
    password:{type:String, required:true},
    dob:{type:Date,required:true}
});

const userModel = mongoose.model("user",schema);

module.exports = userModel;