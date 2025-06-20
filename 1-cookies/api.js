const express = require("express");

const app = express();
const dotenv = require("dotenv");
dotenv.config();
const {PORT} = process.env;
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.get("/",function(req,res){
    res.cookie("prevPage","home",{maxAge: 100000000,httpOnly:true});
    res.status(200).json({
        message:"Thank you for visiting the page"
    })
})


app.get("/clearCookies",function(req,res){
    res.clearCookie("prevPage",{path:"/"});
    res.status(200).json({
        message:"Cookies cleared successfully"
    })
})

app.listen(PORT, function(){
    console.log(`Server is running on ${PORT}`);
});
