"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosCollection = exports.usersCollection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
const Schema = mongoose_1.default.Schema;
(0, dotenv_1.config)();
(0, dotenv_1.config)({ path: `.env.${process.env.NODE_ENV}` });
const MongoURL = process.env.MONGO_DB_URL;
;
const todoSchema = new Schema({
    title: { type: String },
    description: { type: String },
    userId: { type: String },
    isDone: { type: Boolean },
    date: { type: String }
});
;
const userSchema = new Schema({
    username: { type: String },
    password: { type: String }
});
if (MongoURL) {
    mongoose_1.default.connect(MongoURL);
}
exports.usersCollection = mongoose_1.default.model('users', userSchema);
exports.todosCollection = mongoose_1.default.model('todos', todoSchema);
