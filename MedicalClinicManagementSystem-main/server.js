import express from "express";

import dotenv from "dotenv";
import cors from "cors";
import connectDB from './config/db.js';
import Doctor from './routes/doctor.js';
import User from './routes/user.js';
import Appointment from './routes/appointment.js';
import Departments from "./routes/Departments.js";
const app= express(); //استدعائه وربطه في متغير لسهولة الاستخدام
app.use(express.json()); //لقراءة البيانات الjson
dotenv.config(); 
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 7096;

//استدعاء dotenv والتي ملفها هو env
connectDB();//استدعاء الاتصال بلقاعدة البيانات 
app.use(cors({
  origin: "https://medical-clinic-management-system.vercel.app", // React
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));




app.use('/user',User);

app.use('/doctors',Doctor);
app.use('/appointments',Appointment);
app.use('/departments',Departments);


app.use('/uploads',express.static("uploads"))



app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});
