import mongoose from "mongoose";

const photoSchema = mongoose.Schema({
    AlbumId:{    
    type:[mongoose.Schema.Types.ObjectId],
    required:true,
    ref:"Album"
    },
    photoTitle:{
        type:String,
        required:true,
    },
    ImageUrl:{
        type:String,
        required:true,  
    }
})
export default mongoose.model('Photo',photoSchema)