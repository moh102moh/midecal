
import express from "express";

import auth from '../auth/Middleware.js'
import Departments from "../models/DepartmentSchema.js";
import multer from "multer";
const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage });

router.post('/addDepartments',auth("admin"),upload.single('image'), async(req,res)=>{

    /* ممكن اجذف لشرط الشرط انه في حال ماكان ادمن مابيقدر يعمل شي */
    /*ممكن احذف لشرط لانو انا بلاساس */


     const image = req.file ? req.file.filename : null
const{name ,description} = req.body
if(!name || !description){
    return res.status(400).json({message:"the name is required"})
}
const department = await Departments.create({name ,
    description,
    image:req.file?.filename});
    return res.status(201).json(department)
});

router.get('/allDepartment',async (req,res)=>{
  try{ const departments = await Departments.find({}) ;
  return res.status(200).json(departments);
}
catch(error){
  console.log("error")
}
 
})
router.get('/count',async(req,res)=>{
    try{
    const count = await Departments.countDocuments();
    return res.status(200).json(count)
    }
    catch(error){
        return res.status(400).json({message:"Error fetching"})

    }
});
export default router;