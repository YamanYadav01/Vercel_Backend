import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    fullname:{
        type:String,
        required:true
    },
    username:{
        type:String
    }
},{
    timestamp:true
})

const User = mongoose.model("User", userSchema);
export default User;
