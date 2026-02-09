import mongoose from 'mongoose';
const BookingSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    room:{
        type:mongoose.Schema.Types.ObjectId,
        ref:mongoose.Schema.Types.ObjectId,
        ref:"Room",
        required:true
    },
    checkIn:{
        type:Date,
        required:true,
    },
    checkEnd:{
        type:Date,
        required:true,
    },
    status:{
        type:String,
        enum: ["reserved", "checked_in", "checked_out", "cancelled"], 
        default:"reserved",
    },
    createAt:{
         type: Date,
         default: Date.now,
    },
});
const Booking = mongoose.model("Booking",BookingSchema);
export default Booking;