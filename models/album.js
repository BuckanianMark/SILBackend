import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

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
albumSchema.plugin(mongoosePaginate);

export default mongoose.model("Album",albumSchema)