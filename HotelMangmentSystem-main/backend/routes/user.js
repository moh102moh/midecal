import express from 'express' ;
const router = express.Router();
import User from '../models/UserSchema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

router.post('/register',async(req,res)=>{
    const {name,email,phone,password,role="user"} = req.body ;

    if(!name || !email || !phone || !password){
        return res.status(400).json({message: "All fields is required"})
        
    };
    const userExist = await User.findOne({email})
    if(userExist){
        return res.status(400).json({message:"The user is Already register"})

    };

    const hashPassword = await bcrypt.hash(password,10);


    const newUser = await User.create({name,email,phone,password:hashPassword});

    let token = jwt.sign({email,id:newUser._id , role:newUser.role},
        process.env.SECRET_KEY,/*تاريخ انتهاء صلاحية المفتاح*/{expiresIn:'1w'})
        return res.status(201).json({message:"user register sucssfuly",token,user:{
          name :newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          password:newUser.password,
          role :newUser.role
        }});

});
router.post('/login',async(req,res)=>{
    const{email, password}= req.body ;

    if( !email || !password) {
        return res.status(400).json({message:"All fields is required"})
    };

    const user = await User.findOne({email})
        if(!user) {
            return res.status(400).json({message:"The email is not found please register"})
        }
    
        const match = await bcrypt.compare(password ,user.password)
        if(!match){
            return res.status(400).json({message:"The password id not correct"})
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
        
});
export default router;
