import mongoose from 'mongoose';
import { config } from 'dotenv';
import path from 'path';
config();
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
config({ path: `.env.${process.env.NODE_ENV}`});
const MongoURL = process.env.MONGO_DB_URL;

const todoSchema = {
    title: String,
    description: String,
    userId: String,
    isDone: Boolean,
    date: String
};

const userSchema = {
    id: String,
    username: String,
    password: String
}

mongoose.connect(MongoURL);
const usersCollection = mongoose.model('users', userSchema);
const todosCollection = mongoose.model('todos', todoSchema);

export {
    todosCollection,
    usersCollection
}