import { log } from "console";
import { Schema,model } from "mongoose";

const fundSchema = new Schema({
    fundNum:{
        type:Number,
        required:true,
        min:100
    },
    createdby:{
        type:Schema.Types.ObjectId,
        ref:"users"
    }
},{timestamps:true})



const fundModel = model("funds",fundSchema);

export default fundModel;
