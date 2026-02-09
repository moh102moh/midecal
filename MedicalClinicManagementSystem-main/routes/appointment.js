import express from "express";
import Appointment from '../models/AppointmentSchema.js';
import auth from '../auth/Middleware.js'

const router = express.Router();

router.post("/createAppointment", auth(),async(req,res) => {
    const { doctor,date,reason} =req.body 
if(!doctor || !date|| !reason) {
    return res.status(400).json({message:"All data is required"})
}
const appointment =  await Appointment.create({
user: req.user.id,
doctor,
date,
reason
});

return res.status(201).json(appointment)
});


router.get("/myAppointments",auth(), async(req,res)=>{
const appointments = await Appointment.find({user:req.user.id}).populate("doctor")/*هي مشان يطالع بيانات الدكتور كمان */
return res.status(201).json(appointments);
});

router.post("/deleteAppointment/:id", async(req,res)=>{

    try{
    const{id} = req.params
    const appointment = Appointment.findByIdAndDelete(id);

    if(!appointment){
        return res.status(400).json({message:"appointment not found"})
    }return res.status(200).json({message:"Delete Sucssfully"});
}
catch{
    console.error(error);
 return res.status(500).json({message:"Error Server Internal"})
}
})

export default router;

