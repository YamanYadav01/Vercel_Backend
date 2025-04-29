import mongoose from "mongoose";
// import User from "./model";
// import File from "./File";

const likeSchema = mongoose.Schema({
      postId:{
        type: mongoose.Schema.Types.ObjectId,
        // ref:'File'
      },
      userId:{
        type:String,
        required:true,
      },
      likeCount:{
        type:Number,
        required:true,
      },
      likedUser:[{
        type:String,
        
      }],
      liked:{
        type:Boolean,
        required:true,
      }
      
})
const postLike = mongoose.model('postLike',likeSchema)
export default postLike;