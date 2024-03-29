import mongoose from "mongoose";
const authUserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true
    },
    password : {
        type:String,  
        required:true
    },
    token : {
        type:String
    }
})
export default mongoose.model('authUser',authUserSchema);