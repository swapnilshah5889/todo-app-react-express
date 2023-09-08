import express from 'express';
import { todosCollection, usersCollection } from './db/index.js';
import Middleware from './middleware/index.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// Cors routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
})


// Sign up user
app.post('/signup', Middleware.verifyNewUser, async (req, res) => {
    const userJson = {
        username: req.body.username,
        password: req.body.password
    }
    const newUser = await usersCollection(userJson); 
    await newUser.save();
    if(newUser) {
        res.status(200).json({status: true, data: newUser});
    }
    else {
        res.status(500).json({status: false, message: 'Something went wrong'});
    }
});

// Login user
app.post('/userlogin', async (req, res) => {
    if(req.body.username && req.body.password) {
        const user = await usersCollection.findOne({username: req.body.username, password: req.body.password});
        if(user) {
            res.status(200).json({status: true, message: "Login Successful", userid:user._id});
        }
        else {
            res.status(200).json({status: false, message: 'Invalid credentials'});
        }
    }
    else {
        console.log(req.body.username, req.body.password);
        res.status(400).json({status: false, message: 'Invalid parameters'});
    }
});

// Get all user todos
app.get('/todos', Middleware.verifyUser, async (req, res) => {
    const todos = await todosCollection.find({userId: req.userId});
    if(todos) {
        res.status(200).json({status:true, data:todos});
    }
    else {
        res.status(500).json({status:false, message:"Something went wrong"});
    }
});

// Add Todo
app.post('/todos', Middleware.verifyUser, async (req, res) => {

    try {
        const todoJson = {
            title: req.body.title,
            description: req.body.description,
            isDone: false,
            date: new Date().toISOString(),
            userId: req.userId
        };
        const newTodo = await todosCollection(todoJson);
        newTodo.save();
        res.status(200).json({status:true, data:newTodo});
    } catch (error) {
        res.status(500).json({status:false, message:'Something went wrong'});
    }

});

// Update Todo
app.put('/todos/:id', Middleware.verifyUser, Middleware.verifyTodo, async (req, res) => {

    try {
        if(req.body.title) {
            req.todo.title = req.body.title; 
        }
        if(req.body.description) {
            req.todo.description = req.body.description; 
        }
        if('isDone' in req.body) {
            req.todo.isDone = req.body.isDone; 
        }
        const updatedTodo = await todosCollection.findOneAndUpdate(
            { _id: req.params.id },
            req.todo,
            { new: true }
        );
        if(updatedTodo) {
            res.status(200).json({status:true, data:updatedTodo});
        }
        else {
            res.status(500).json({status: false, message: 'Something went wrong'});
        }
    } catch (error) {
        res.status(500).json({status: false, message: 'Something went wrong'});
    }

});

// Delete Todo
app.delete('/todos/:id', Middleware.verifyUser, Middleware.verifyTodo, async (req, res) => {
    try {
        if(req.userId == req.todo.userId) {
            const todo = await todosCollection.findByIdAndDelete(req.todo._id);
            res.status(200).json({status:true, message: 'Todo deleted successfully'});
        }
        else {
            res.status(500).json({status: false, message: 'Invalid Request'});
        }

    } catch (error) {
        res.status(500).json({status: false, message: 'Something went wrong'});
    }
});

//for all other routes, return 404
app.use((req, res, next) => {
    res.status(404).send();
});

app.listen(3001, () => {
    console.log("Server started at 3001 port");
})
