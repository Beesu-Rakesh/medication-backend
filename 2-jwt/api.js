const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());

const jwt = require('jsonwebtoken');
const promisify = require("util").promisify;

const promisifiedJwtSign = promisify(jwt.sign);
const promisifiedJwtVerify = promisify(jwt.verify);

const payload = "1235";
const secretKey = "i am secret";

app.get("/sign", async function(req,res){
    try{
        const authToken = await promisifiedJwtSign({data: payload},secretKey,{expiresIn: '1hr', algorithm: 'HS256'});
        res.cookie("jwt", authToken, {maxAge: 3600000, httpOnly: true});
        res.status(200).json({
            message: "Token signed successfully",
            authToken
        })
    }catch(err){
        res.status(400).json({
            message:err.message,
            status:"failure"
        })
    }
})

app.get("/verify", async function(req,res){
    try{
    const token = req.cookies.jwt;
    const decodedToken = await promisifiedJwtVerify(token, secretKey);

    res.status(200).json({
        message:"token is decoded",
        decodedToken
    })
    }catch(err){
        res.status(400).json({
            message:err.message,
            status:"failure"
        })
    }
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})