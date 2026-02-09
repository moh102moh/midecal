import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({

    /*عملنا صلة وصل بين كل يوز فينو يعملم موعد مع دكتور وهكذا بتم لربط  */
    user: {
        type: mongoose.Schema.Types.ObjectId,ref:"User"
    },

    doctor:{
        type: mongoose.Schema.Types.ObjectId,ref:"Doctor"
    },
    date:Date,

    reason:String,

});
const Appointment = mongoose.model("Appointment",AppointmentSchema);
export default Appointment;