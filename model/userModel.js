const mongoose = require('mongoose');

const userSchemaRules = {
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:8,
        validate: function(){
            return this.password == this.confirmPassword;
        }
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    token:String
}
const userSchema = new mongoose.Schema(userSchemaRules);
//This model will have queries/syntaxes
const userModel = mongoose.model("userModel",userSchema);

module.exports = userModel;