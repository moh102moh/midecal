/*استدعاء الاعدادات العامة */
import express from 'express';
import dotenv from 'dotenv'
import connectDB from './confing/db.js';
import cors from 'cors';
/* ---------*/
import User from './routes/user.js';
import Room from './routes/room.js';
import Booking from './routes/booking.js';

//*اعدادات العامة والاتصال  بقاعدة البيانات */
const app = express();
app.use(express.json());
dotenv.config();
app.use(express.urlencoded({ extended: true })); 
const PORT = process.env.PORT || 3000 ;
connectDB();
app.use(cors({
    origin: [
        "https://hotelmangmentsystem.onrender.com", 
        "https://hotel-mangment-system-txva.vercel.app", 
        "http://localhost:3000",
        "http://localhost:3001"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));


/*------------- */
app.use('/user',User);
app.use('/room',Room);
app.use('/book',Booking);

app.use('/uploads',express.static("uploads"))


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});
