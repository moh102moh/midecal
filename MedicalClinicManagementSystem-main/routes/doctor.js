import express from "express";
import multer from "multer";
import Doctor from "../models/DoctorSchema.js";

const router = express.Router()


const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    cb(null, './uploads')
  },
     
  filename: function (req, file, cb) {
     const ext = file.originalname.split('.').pop();
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext)
  }
})

const upload = multer({ storage: storage })

router.post('/addDoctors',upload.single('image'), async(req,res)=>{
try {
    const {name,specialty,description,experienceYears} = req.body


    const image = req.file ? req.file.filename : null

    if(!name || !specialty  || !description || !experienceYears || !image){
        return res.status(400).json({message:"all fialid is required"});
    }
    const newDoctor = new Doctor({
        name,
        specialty,
        image:req.file?.filename,
        description,
        experienceYears

    })
    const savedDoctors = await newDoctor.save();
    return res.status(201).json(savedDoctors);
}
catch{
    console.error(error)
       return res.status(500).json({messsage:error});
}
});
router.get('/allDoctors',async(req,res)=>{
    const doctors =await Doctor.find()

    return res.json(doctors);
});

router.get('/count',async(req,res)=>{
    try{
    const count = await Doctor.countDocuments();
    return res.status(200).json(count)
    }
    catch(error){
        return res.status(400).json({message:"Error fetching"})

    }
});
router.get('/:id',async(req,res)=>{
    const doctor = await Doctor.findById(req.params.id);
    if(!doctor){
        return res.status(400).json({message:"doctor not defind"})
    }
    return res.json(doctor);

    
});

export default router;