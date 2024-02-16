import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    userName:{
        type:String, 
        required:true
    },
    albums: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album"
    }]
})
export default mongoose.model('User',userSchema);