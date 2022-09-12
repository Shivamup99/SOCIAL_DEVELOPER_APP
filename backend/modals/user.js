import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    password2:{
        type:String
    },
    avatar:{
        type:String
    },
},{timestamps:true})

const userModal = mongoose.model('Users',userSchema)
export default userModal;