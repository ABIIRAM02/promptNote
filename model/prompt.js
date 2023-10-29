import { Schema , model , models } from "mongoose";

const promptSchema = new Schema({
    creater:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    prompt:{
        type:String,
        required:[true, 'Prompt is required']
    },
    tag:{
        type:String,
        required:[true, 'Prompt is required']
    }
});

const Prompt = models.prompt || model('prompt', promptSchema)

export default Prompt