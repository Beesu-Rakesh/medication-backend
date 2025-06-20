 const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
const {PORT, DB_PASSWORD,DB_USER} = process.env;
const app = express();
const UserRouter = require('./router/UserRouter.js');

const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster1.ortc27k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`

mongoose.connect(dbURL).then(function(connection){
    console.log("connection success");
}).catch(err => console.log(err)); 

app.use(express.json());// to get data from user , is example for userDefinedMiddleware

app.use("/api/user",UserRouter);

/**app.get("/search",function(req,res){
    console.log(req.query);
    res.status(200).json({
        status:"success",
        message:req.query
    })
}); **/

app.use(function(req,res){
    res.status(404).json({
        status:"failure",
        message:"404 Page Not Found"
    })
})

app.listen(PORT,function(){
    console.log(`server is running on port ${PORT}`);
}) 

