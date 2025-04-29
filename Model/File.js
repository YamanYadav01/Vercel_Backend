import mongoose from "mongoose";

const fileSchema = mongoose.Schema({
    filename:{
        type:String,
        required:true
    },
    thoughts:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
    }
})

const File = mongoose.model('File',fileSchema);
export default File;