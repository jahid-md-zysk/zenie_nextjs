import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"Please provide a username"],
        unique:true
    },
    gender:{
        type: String,
        required: [true,"Please provide a gender"]
    },
    interests: {
        type: Array,
        required: [true,"Please provide a interests"]
    },
    email: {
        type: String,
        required: [true,"Please provide a email"],
        unique:true
    },
    address: {
        type: String,
        required: [true,"Please provide a address"]
    },
    comment:{
        type: String,
        required: [true,"Please provide a comment"]
    },
})

const User = mongoose.models.users || mongoose.model("users",userSchema);

export default User;