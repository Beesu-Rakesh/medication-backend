const express = require("express");
const UserRouter = express.Router();
const {
    createUserHandler,
    getAllUsers,
    getUserById,
    deleteUserById
} = require('../controller/userController.js');

const checkInput = function(req,res,next){// checklist if we are sending the empty data or not to post method
    if(req.method == "POST"){
        const userDetails = req.body;
        const isEmpty = Object.keys(userDetails).length == 0;
        if(isEmpty){
            res.status(404).json({
                status:"failure",
                message:"user Details are empty"
            })
        }
    }
    next();
    
};

/******User Routes*****/
UserRouter.get("/",getAllUsers);
// to create a user
UserRouter.post("/",checkInput,createUserHandler);
// to get user based on id -> template route
UserRouter.get("/:elementId",getUserById)
//to delete user based on id
UserRouter.delete("/:elementId",deleteUserById);

module.exports = UserRouter;