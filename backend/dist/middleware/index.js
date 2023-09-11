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
const index_js_1 = require("../db/index.js");
const mongoose_1 = __importDefault(require("mongoose"));
// Verify If User Exists
const verifyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // If username available
    if (req.headers.username) {
        const user = yield index_js_1.usersCollection.findOne({ username: req.headers.username });
        if (user) {
            req.headers['userId'] = user._id;
            next();
        }
        else {
            res.status(401).json({ status: false, message: 'Invalid username' });
        }
    }
    // Invalid request
    else {
        res.status(401).json({ status: false, message: 'Username required' });
    }
});
// Verify If User Exists
const verifyUserLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.username && req.body.password) {
        const user = yield index_js_1.usersCollection.findOne({ username: req.body.username, password: req.body.password });
        if (user) {
            req.body.userVerified = user.isVerified;
            req.body.userId = user._id;
            next();
        }
        else {
            res.status(200).json({ status: false, message: 'Invalid credentials' });
        }
    }
    else {
        console.log(req.body.username, req.body.password);
        res.status(400).json({ status: false, message: 'Invalid parameters' });
    }
});
// Verify If User Registration
const verifyUserRegistration = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // If username and otp exists
    if (req.body.username && req.body.otp) {
        // If username available
        const user = yield index_js_1.usersCollection.findOne({ username: req.body.username });
        if (user) {
            if (req.body.otp === user.otp && (new Date().getTime() < user.otpExpire)) {
                user.isVerified = true;
                yield index_js_1.usersCollection.findOneAndUpdate({ _id: user._id }, user);
                next();
            }
            else {
                res.status(401).json({ status: false, message: 'Invalid OTP or OTP Expired' });
            }
        }
        else {
            res.status(401).json({ status: false, message: 'Invalid username' });
        }
    }
    else {
        res.status(500).json({ status: false, message: 'Invalid Data' });
    }
});
const verifyTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (mongoose_1.default.Types.ObjectId.isValid(req.params.id)) {
            const todo = yield index_js_1.todosCollection.findOne({ _id: req.params.id });
            if (todo && req.headers['userId'] == todo.userId) {
                req.headers['todoId'] = todo._id;
                next();
                return;
            }
        }
    }
    catch (error) {
        console.log(error);
    }
    res.status(500).json({ status: false, message: 'Invalid request' });
});
const verifyNewUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.username && req.body.password) {
        const user = yield index_js_1.usersCollection.findOne({ username: req.body.username });
        if (!user) {
            next();
        }
        else {
            res.status(400).json({ status: false, message: 'User already exists' });
        }
    }
    else {
        res.status(400).json({ status: false, message: 'Invalid params' });
    }
});
const Middleware = {
    verifyUser,
    verifyTodo,
    verifyNewUser,
    verifyUserRegistration,
    verifyUserLogin
};
exports.default = Middleware;
