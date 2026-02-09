import jwt from "jsonwebtoken";

/*requiredRole هي انا عرفتا وعطيتا هون قمة فاضية 
بس قيمتها معرفا بملف departments وقيمتها هيه 
admin  وعملت شرط في حال القيمة المرسلة كان ماتبتطابق لتكون الموجود رجعلي ايرور وهكذا فقط  */
const auth = (requiredRole = null)=>{

    return async(req,res,next )=>{

    /* انا لما عم اعمل عملية  عرض مواعيدي ااافة مواعيد ف لازم اعرف هي المواعيد لمين*/
    /* ف كيف بقدر اعرف عن طريق التكون ولد تكون بكل عملية تسجيل دخول */
      /*من خلاله بقدر اني او بكون معو في ال id والايميل وهكذا*/


        /*عرفت تكون متغير بجيبو من مكان التوليد*/
    let token =req.headers['authorization'];

      /*اذا كان غلط التوكن ف بيتعطيني ايرور*/
    if(!token){
        return res.status(404).json({message:"Acsess Defind On Token"})
    }
      /*اذذا كان صحيح بولدو وبياخد الجزء تبعو*/
token = token.split(" ")[1]


  /*هو رح يعمل عملية تحقق من التوكن كرمال يقدر يمرقو لباقي المسارات */
    /*بس كان صحيح بيعطيه سماحية انو يكمل مرور على باقي المسارات والعمليات*/
jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
    if(err){
        return res.status(400).json({message:"  Invalied Token"})
    }else{
        console.log(decoded)
        req.user= decoded;

if(requiredRole && decoded.role !==requiredRole){
  return res.status(403).json({message:"Acces not defined role"})
}


        next();
    }
})
}

}


export default auth;