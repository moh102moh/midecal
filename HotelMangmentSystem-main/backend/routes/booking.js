import express from 'express';
import Booking from '../models/BookingSchema.js';
import auth from '../auth/Middleware.js'
const router = express.Router();

router.post('/addBooking',auth(),async(req,res)=>{
const {room,checkIn,checkEnd,status} = req.body;

if(!room  || !checkIn || !checkEnd || !status){
    return res.status(400).json({message:"All fields is required"});
}

const newBooking = await Booking.create ({ user: req.user.id,
    room,checkIn,checkEnd,status});
    const bookSave = await newBooking.save();
    return res.status(200).json(bookSave);
});
router.get('/allBooking',auth(),async(req,res)=>{
    const book = await Booking.find({user:req.user.id}).populate("room")
    return res.status(200).json(book);
});
router.delete('/deleteBooking/:id',async(req,res)=>{
    try{
    const {id} = req.params
    const deleteBook = await Booking.findByIdAndDelete(id)
    if(!deleteBook){
        return res.status(400).json({message:"The Booking not Found"})
    }

    return res.status(200).json({message:"Delete Don Sucssfully"})
    }
    catch{
    console.error(error);
    return res.status(500).json({message:"Error Server Internal"})
    }
});
export default router;

