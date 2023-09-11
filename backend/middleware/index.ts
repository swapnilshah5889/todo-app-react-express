import { usersCollection, todosCollection } from "../db/index.js";
import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";

// Verify If User Exists
const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    // If username available
    if(req.headers.username) {
        const user = await usersCollection.findOne({username: req.headers.username});
        if(user) {
            req.headers['userId'] = user._id as string;
            next();
        }
        else {
            res.status(401).json({status:false, message: 'Invalid username'});    
        }
    }
    // Invalid request
    else {
        res.status(401).json({status:false, message: 'Username required'});
    }
}

// Verify If User Exists
const verifyUserLogin = async (req: Request, res: Response, next: NextFunction) => {

    if(req.body.username && req.body.password) {
        const user = await usersCollection.findOne({username: req.body.username, password: req.body.password});
        if(user) {
            req.body.userVerified = user.isVerified as boolean;
            req.body.userId = user._id;
            next();
        }
        else {
            res.status(200).json({status: false, message: 'Invalid credentials'});
        }
    }
    else {
        console.log(req.body.username, req.body.password);
        res.status(400).json({status: false, message: 'Invalid parameters'});
    }
    
}

// Verify If User Registration
const verifyUserRegistration = async (req: Request, res: Response, next: NextFunction) => {

    // If username and otp exists
    if(req.body.username && req.body.otp) {
        // If username available
        const user = await usersCollection.findOne({username: req.body.username});
        if(user) {
            if(req.body.otp === user.otp && (new Date().getTime() < (user.otpExpire as number))) {
                user.isVerified = true;
                await usersCollection.findOneAndUpdate(
                    { _id: user._id },
                    user
                );
        
                next();
            }
            else {
                res.status(401).json({status:false, message: 'Invalid OTP or OTP Expired'});    
            }
        }
        else {
            res.status(401).json({status:false, message: 'Invalid username'});    
        }
        
    }
    else {
        res.status(500).json({status: false, message: 'Invalid Data'});
    }
}

const verifyTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(mongoose.Types.ObjectId.isValid(req.params.id)) {
            const todo = await todosCollection.findOne({_id:req.params.id});
            if(todo && req.headers['userId'] == todo.userId) {
                req.headers['todoId'] = todo._id;
                next();
                return;
            }
        }
        
    } catch (error) {
        console.log(error);
    }
    res.status(500).json({status:false, message:'Invalid request'});
}

const verifyNewUser = async (req: Request, res: Response, next: NextFunction) => {
    if(req.body.username && req.body.password) {
        const user = await usersCollection.findOne({username:req.body.username});
        if(!user) {
            next();
        }
        else {
            res.status(400).json({status:false, message: 'User already exists'});
        }
    }
    else {
        res.status(400).json({status:false, message: 'Invalid params'});
    }
}

const Middleware = {
    verifyUser,
    verifyTodo,
    verifyNewUser,
    verifyUserRegistration,
    verifyUserLogin
}; 

export default Middleware;