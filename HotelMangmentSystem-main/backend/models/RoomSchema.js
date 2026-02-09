import { request } from 'express';
import mongoose from 'mongoose';
const RoomSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    number:{
        type:Number,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    size:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image: String,

        
    
});
const Room = mongoose.model("Room",RoomSchema)
export default Room;