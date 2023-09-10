import express from 'express';
import { todosCollection, usersCollection } from './db/index.js';
import Middleware from './middleware/index.js';
import cors from 'cors';
import { Request, Response, NextFunction } from 'express';

const app = express();
app.use(express.json());
app.use(cors(
    {
        origin: ['https://todo-app-swapnilshah.netlify.app', 'http://3.144.31.71:3000']
    }
));

// // Cors routes
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'todo-app-swapnilshah.netlify.app');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// })


// Sign up user
app.post('/signup', Middleware.verifyNewUser, async (req: Request, res: Response) => {
    const userJson = {
        username: req.body.username,
        password: req.body.password
    }
    const newUser = new usersCollection(userJson); 
    await newUser.save();
    if(newUser) {
        res.status(200).json({status: true, data: newUser});
    }
    else {
        res.status(500).json({status: false, message: 'Something went wrong'});
    }
});

// Login user
app.post('/userlogin', async (req: Request, res: Response) => {
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
app.get('/todos', Middleware.verifyUser, async (req: Request, res: Response) => {
    const todos = await todosCollection.find({userId: req.headers['userId']});
    if(todos) {
        res.status(200).json({status:true, data:todos});
    }
    else {
        res.status(500).json({status:false, message:"Something went wrong"});
    }
});

// Add Todo
app.post('/todos', Middleware.verifyUser, async (req: Request, res: Response) => {

    try {
        const todoJson = {
            title: req.body.title,
            description: req.body.description,
            isDone: false,
            date: new Date().toISOString(),
            userId: req.headers['userId']
        };
        const newTodo = new todosCollection(todoJson);
        await newTodo.save();
        res.status(200).json({status:true, data:newTodo});
    } catch (error) {
        res.status(500).json({status:false, message:'Something went wrong'});
    }

});

// Update Todo
app.put('/todos/:id', Middleware.verifyUser, Middleware.verifyTodo, async (req: Request, res: Response) => {

    try {
        
        const newTodo = {
            title: req.body.title,
            description: req.body.description,
            isDone: req.body.isDone
        }
        const updatedTodo = await todosCollection.findOneAndUpdate(
            { _id: req.params.id },
            newTodo,
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
app.delete('/todos/:id', Middleware.verifyUser, Middleware.verifyTodo, async (req: Request, res: Response) => {
    try {
        
        const todo = await todosCollection.findByIdAndDelete(req.headers['todoId']);
        res.status(200).json({status:true, message: 'Todo deleted successfully'});

    } catch (error) {
        res.status(500).json({status: false, message: 'Something went wrong'});
    }
});

//for all other routes, return 404
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send();
});

app.listen(3001, () => {
    console.log("Server started at 3001 port");
})
