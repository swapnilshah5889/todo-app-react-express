import mongoose, { Model, Document } from 'mongoose';
import { config } from 'dotenv';
const Schema = mongoose.Schema;
config();
config({ path: `.env.${process.env.NODE_ENV}`});
const MongoURL = process.env.MONGO_DB_URL;

interface ITodo extends Document {
    title: String,
    description: String,
    userId: String,
    isDone: String,
    date: String
};

const todoSchema = new Schema<ITodo>(
    {
        title: { type: String},
        description: { type: String},
        userId: { type: String},
        isDone: { type: Boolean},
        date: { type: String}
    }
);

interface IUser extends Document {
    _id: String,
    username: String,
    password: String,
    isVerified: Boolean,
    otp : Number,
    otpExpire: Number,
};


const userSchema = new Schema<IUser> (
    {
        username: { type: String},
        password: { type: String},
        isVerified : { type: Boolean, default:false},
        otp: { type: String, required: true},
        otpExpire: { type: Number}
    }
);


if(MongoURL) {
    mongoose.connect(MongoURL);
}
export const usersCollection = mongoose.model<IUser>('users', userSchema);
export const todosCollection = mongoose.model<ITodo>('todos', todoSchema);