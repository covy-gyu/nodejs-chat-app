import { Schema, Model } from 'mongoose';

const chatSchema = new Schema({
    sender_id:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    receiver_id:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    message:{
        type:String,
        required:true
    }

},
{timestamps:true}
)

export default Model('Chat', chatSchema)