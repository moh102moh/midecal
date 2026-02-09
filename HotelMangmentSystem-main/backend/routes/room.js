import express from 'express';
import multer from 'multer';
import Room from '../models/RoomSchema.js';


const router = express.Router();


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


router.post('/addRoom',upload.single('image'),async(req,res)=>{
    try{
    const{name,number,type,size,price}= req.body;
     const image = req.file ? req.file.filename : null

     if(!name || !number || !type || !size || !price || !image ){
        return res.status(400).jdon({message:"All fields are required"});
     }
     const newRoom = await Room.create({name,number,type,size,price,image});

     const saveRoom = await newRoom.save();
     return res.status(200).json(saveRoom);
    }
    catch{
        console.log(error);
        return res.status(500).json({message:error});
    }

});
router.get('/allRoom', async(req,res)=>{
    const rooms = await Room.find()
    return res.status(200).json(rooms);

});
router.get('/:id',async(req,res)=>{
    const rooms = await Room.findById(req.params.id)

    if(!room){
        return res.status(400).json({message:"Room is not found"})
    }
    return res.status(200).json(rooms);
});
export default router;