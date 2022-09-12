import mongoose from "mongoose";

const postsSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    text:{
        type:String,
        required:true
    },
    name:{
        type:String
    },
    avatar:{
        type:String
    },
    likes:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Users'
            },
        }
    ],
    comments:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Users'
            },
            text:{
                type:String,
                required:true
            }, 
            name:{
                type:String
            },
            avatar:{
                type:String
            }
        }
    ]
},{timestamps:true})

const postsModal = mongoose.model('Posts',postsSchema)
export default postsModal