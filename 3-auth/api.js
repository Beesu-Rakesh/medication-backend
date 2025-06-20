const express = require('express');
const cookieParser = require('cookie-parser');
const { get } = require('mongoose');
const app = express();
app.use(cookieParser());

const signupController = async function(req,res){
    try{
        const userObject = req.body;
        let newUser = await userModel.create(userObject);
        res.status(201).json({
            "message":"User Created Successfully",
            user:newUser,
            status:"success"
        })
    }catch(err){
        res.status(500).json({
            "message":err.message,
            status:"failure"
        })
    }
}

const loginController = async function(req,res){
    try{
        let {email,password} = req.body;
        let user = await userModel.findOne({email});
        if(user){
            let areEqual = password == user.password;
            if(areEqual){
                let token = await promisifiedJWTSign({id:user["id"]},JWT_SECRET);
                console.log("sending token");
                res.cookie("JWT",token,{maxAge:5000000,httpOnly:true,path:"/"});
                res.status(200).json({
                    status:"success",
                    message:"User logged in successfully",
                })
            }else{
                res.status(404).json({
                    status:"failure",
                    message:"email or password is incorrect"
                    
                }) 
            }
        }
    }catch(err){

    }
}

const protectRouteMiddleware = async function(req,res,nect){
    try{
        let decryptedToken = await promisifiedJWTVerify(req.cookies.JWT,JWT_SECRET);
        if(decryptedToken){
            let userId = decryptedToken.id;
            req.userID = userId;
            next();
        }
    }catch(err){
        res.status(500).json({
            status:"failure",
            message:err.message
        })
    }
}

const getUserData = async function(req,res){
    try{
        const id = req.userId;
        const user = await userModel.findById(id);
        res.status(200).json({
            message:"User data fetched successfully",
            user
        })
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

app.post("/signup",signupController);
app.post("/login",loginController);
app.get("/allowIfLoggedInUser",protectRouteMiddleware,getUserData);

app.use(function(req,res){
    res.status(404).json({
        status:"failure",
        message:"404 Page Not Found"
    })
})





app.listen(3000, function(){
    console.log("Server is running on port 3000");
})