import mongoose from "mongoose";

const albumSchema = mongoose.Schema({
    User:{
        type:[mongoose.Schema.Types.ObjectId],
        required:true,
        ref:"User"
    },
    Title:{
        type:String,
        required:true
    }
})

export default mongoose.model("Album",albumSchema)