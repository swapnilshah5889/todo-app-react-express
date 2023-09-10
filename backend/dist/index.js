"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_js_1 = require("./db/index.js");
const index_js_2 = __importDefault(require("./middleware/index.js"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'https://todo-app-swapnilshah.netlify.app'
}));
// // Cors routes
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'todo-app-swapnilshah.netlify.app');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// })
// Sign up user
app.post('/signup', index_js_2.default.verifyNewUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userJson = {
        username: req.body.username,
        password: req.body.password
    };
    const newUser = new index_js_1.usersCollection(userJson);
    yield newUser.save();
    if (newUser) {
        res.status(200).json({ status: true, data: newUser });
    }
    else {
        res.status(500).json({ status: false, message: 'Something went wrong' });
    }
}));
// Login user
app.post('/userlogin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.username && req.body.password) {
        const user = yield index_js_1.usersCollection.findOne({ username: req.body.username, password: req.body.password });
        if (user) {
            res.status(200).json({ status: true, message: "Login Successful", userid: user._id });
        }
        else {
            res.status(200).json({ status: false, message: 'Invalid credentials' });
        }
    }
    else {
        console.log(req.body.username, req.body.password);
        res.status(400).json({ status: false, message: 'Invalid parameters' });
    }
}));
// Get all user todos
app.get('/todos', index_js_2.default.verifyUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield index_js_1.todosCollection.find({ userId: req.headers['userId'] });
    if (todos) {
        res.status(200).json({ status: true, data: todos });
    }
    else {
        res.status(500).json({ status: false, message: "Something went wrong" });
    }
}));
// Add Todo
app.post('/todos', index_js_2.default.verifyUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todoJson = {
            title: req.body.title,
            description: req.body.description,
            isDone: false,
            date: new Date().toISOString(),
            userId: req.headers['userId']
        };
        const newTodo = new index_js_1.todosCollection(todoJson);
        yield newTodo.save();
        res.status(200).json({ status: true, data: newTodo });
    }
    catch (error) {
        res.status(500).json({ status: false, message: 'Something went wrong' });
    }
}));
// Update Todo
app.put('/todos/:id', index_js_2.default.verifyUser, index_js_2.default.verifyTodo, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTodo = {
            title: req.body.title,
            description: req.body.description,
            isDone: req.body.isDone
        };
        const updatedTodo = yield index_js_1.todosCollection.findOneAndUpdate({ _id: req.params.id }, newTodo, { new: true });
        if (updatedTodo) {
            res.status(200).json({ status: true, data: updatedTodo });
        }
        else {
            res.status(500).json({ status: false, message: 'Something went wrong' });
        }
    }
    catch (error) {
        res.status(500).json({ status: false, message: 'Something went wrong' });
    }
}));
// Delete Todo
app.delete('/todos/:id', index_js_2.default.verifyUser, index_js_2.default.verifyTodo, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield index_js_1.todosCollection.findByIdAndDelete(req.headers['todoId']);
        res.status(200).json({ status: true, message: 'Todo deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ status: false, message: 'Something went wrong' });
    }
}));
//for all other routes, return 404
app.use((req, res, next) => {
    res.status(404).send();
});
app.listen(3001, () => {
    console.log("Server started at 3001 port");
});
