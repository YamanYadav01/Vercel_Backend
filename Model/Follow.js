import mongoose from "mongoose";
// import User from "./model";
const followSchema = mongoose.Schema({

       userId:{
        type:String,
        required:true,
       },
       postId:{
         type:String,
         required:true,
       },
       followUsers: [{
        type:String,

       }],
       followCount:{
        type:Number,
        required:true,
       },
       Followd:{
        type:Boolean,
        default:false
       }

})
const Follow = mongoose.model('Follow',followSchema)
export default Follow;
