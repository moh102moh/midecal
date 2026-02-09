import express from "express";
 const router = express.Router();
 import User from '../models/UserSchema.js';
 import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";


 router.post('/register',async(req,res)=>{
    const {name,email,password,role ="user"} = req.body ;
    /* يعني عدم ادخال بيانات في الحقول هذه اذا كانو غير موجودين */
    if( !name || !email || !password) {
        return res.status(400).json({message :"All data is required"})
    }//* مسجل بلسستم من قبل اذا كانو موجودين مسبقا */
    const userExist = await User.findOne({email})
    if (userExist) 
        return res.status(400).json({message:"User is Alrady required"});
/*انشاء وتسجيل مستخدم جديد */



///*تشفير كلمة المرور */

const hashPassword=  await bcrypt.hash(password,10);



    const newUser =  await User.create({name,email,password:hashPassword ,role});
    /*لكل مستخدم توكن فريد معرف ليساعدة في التنقل بين الصفحات  */
    /*توليد التوكن هكذا  */
    let token = jwt.sign({email,id:newUser._id , role:newUser.role},
    process.env.SECRET_KEY,/*تاريخ انتهاء صلاحية المفتاح*/{expiresIn:'1w'})
    return res.status(201).json({message:"user register sucssfuly",token,user:{
      name :newUser.name,
      email: newUser.email,
      password:newUser.password,
      role :newUser.role
    }});
 });

 router.post("/signin",  async(req,res)=>{
   const {email,password} = req.body;

/** */
   if (!email || !password ) {
    return res.status(400).json({message:"Email and password are required"});

   }
/** */
   const user = await User.findOne({email})
   if(!user) {
    return  res.status(400).json({message:"email is not found"});
   }
//** */
   const match = await bcrypt.compare(password,user.password);
   if(!match){
    return res.status(400).json({message:"Password is Not Correct"})
   }
  
    
    let token = jwt.sign({id:user._id,role:user.role},
        process.env.SECRET_KEY,
        /*تاريخ انتهاء صلاحية المفتاح*/{expiresIn:'1w'})
   return res.status(200).json({
  message: "user login sucssfuly",
  token,
  user: {
    name: user.name,
    email: user.email,
    role: user.role
  }
});

 })

 export default router;
