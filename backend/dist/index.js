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
    origin: ['https://todo-app-swapnilshah.netlify.app', 'http://3.144.31.71', 'http://localhost:3000']
}));
// // Cors routes
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'todo-app-swapnilshah.netlify.app');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// })
const getOtp = () => {
    const minutes = 10;
    return [Math.floor(100000 + Math.random() * 900000), new Date().getTime() + minutes * 60000];
};
// Sign up user
app.post('/signup', index_js_2.default.verifyNewUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [otp, otpExpire] = getOtp();
    const userJson = {
        username: req.body.username,
        password: req.body.password,
        otp: otp,
        otpExpire: otpExpire,
    };
    const newUser = new index_js_1.usersCollection(userJson);
    yield newUser.save();
    if (newUser) {
        res.status(200).json({ status: true, data: { username: newUser.username } });
    }
    else {
        res.status(500).json({ status: false, message: 'Something went wrong' });
    }
}));
app.post('/verifyuser', index_js_2.default.verifyUserRegistration, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ status: true, message: "Verify user registration successful" });
}));
// Login user
app.post('/userlogin', index_js_2.default.verifyUserLogin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.userVerified) {
        res.status(200).json({ status: true, data: { redirectTo: "HOME" }, message: "Login Successful" });
    }
    else {
        const [otp, otpExpire] = getOtp();
        yield index_js_1.usersCollection.findOneAndUpdate({ _id: req.body.userId }, {
            otp: otp,
            otpExpire: otpExpire
        });
        res.status(200).json({ status: true, data: { redirectTo: "OTP" }, message: "OTP Sent Successfully" });
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
