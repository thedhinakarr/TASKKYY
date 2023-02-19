import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        maxlength: 30
    },
    lastName:{
        type:String,
        required:true,
        maxlength: 30
    },
    email:{
        type: String,
        required: true,
        maxLength: 50,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String
    },
    role: {
        type: String,
        default: "user"
    },

    userVerifyToken: {
        email: {
            type: String,
            default: null
        },
        phone: {
            type: String,
            default: null
        }
    },

    isVerified: {
        email: {
            type: Boolean,
            default: false
        }
        // },
        // phone: {
        //     type: Boolean,
        //     default: false
        // }
    }

})

let User = mongoose.model("User",userSchema,"users");

export default User;