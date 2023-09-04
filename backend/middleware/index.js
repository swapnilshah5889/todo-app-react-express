import { usersCollection, todosCollection } from "../db/index.js";
import mongoose from "mongoose";

// Verify If User Exists
const verifyUser = async (req, res, next) => {
    // If username available
    if(req.headers.username) {
        const user = await usersCollection.findOne({username: req.headers.username});
        if(user) {
            req.userId = user.id;
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

const verifyTodo = async (req, res, next) => {
    try {
        if(mongoose.Types.ObjectId.isValid(req.params.id)) {
            const todo = await todosCollection.findOne({_id:req.params.id});
            if(todo) {
                req.todo = todo;
                next();
                return;
            }
        }
        
    } catch (error) {
        console.log(error);
    }
    res.status(500).json({status:false, message:'Invalid request'});
}

const verifyNewUser = async (req, res, next) => {
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
    verifyNewUser
}; 

export default Middleware;