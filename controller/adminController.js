const Admin=require("../model/admin/admin")
const bcrypt=require("bcrypt")
const Token=require("../model/user/tokenModel")
const Police=require("../model/Police/Police")
const Complaint=require("../model/complaint/complaintModel")


module.exports={
register:async(req,res)=>{
try {
    const {name,email,contactno,password,city}=req.body

    const hash=await bcrypt.hash(password,10)
    
    const admin=await Admin.create({
        name,
        email,
        contactno,
        password:hash,
        city
    })
    if(admin)
    res.json({message:"admin created successfully",status:true}); 
    else
    res.json({message:"admin creation unsucessfull",status:false})
} catch (error) {
    console.log(error)
    res.json({message:error.message,status:false})
}




},

login:async(req,res)=>{
try {
    const {email,password}=req.body
const admin=await Admin.findOne({email})
const hash=await bcrypt.compare(password,admin.password)
if(hash)
res.json({message:"Login Successful",status:true,admin})
else
res.json({message:"Login unsuccessful",status:false})
} catch (error) {
    console.log(error)
    res.json({message:error.message,status:false})
}


},
//forgot Password for user
forgotPassword:async(req,res)=>{
    try {
        const {email}=req.body
    const admin=await Admin.findOne({email})
    if(admin){
        const token = await Token.create({
            userId: admin._id,
            token: Math.floor(Math.random()*1000000),
          });
          const send = await sendMail(
            admin.email,
            "Password Reset Request",
            `Hello, this is the token requested for password reset, the token will be valid only for 1 hour!!! ${token.token}`
          );
          res.json({
            message: "Token to change password has been sent to your registered email",
            status: true,
          });
    }
    else{
        res.json({message:"email is wrong",status:false})
    }
    
    } catch (error) {
        console.log(error)
        res.json({message:error.message,status:false})
    }
    },
    //for verifying OTP for forgot Password
verifyToken:async(req,res)=>{
        try {
            const { token, password, email } = req.body;
            const admin = await Admin.findOne({ email })
            const tokenn = Token.findOne({ token: token, userId: admin._id });
            if (tokenn) {
                const id = user._id;
                const hashedpassword = await bcrypt.hash(password, 10);
                const updateduser = await Admin.findByIdAndUpdate(
                    id,
                    {
                        password: hashedpassword,
                        isVerified:true,
                    },
                    { new: true }
                );
                if (updateduser) res.json({ message: "new password set sucessfully", status: true, updateduser });
            } else {
                res.json({
                    message: "OTP is wrong!!.",
                    status: true,
                
                });
            }
        } catch (error) {
            console.log(error);
            res.json({ message: error.message, status: false });
        }
    },

updateProfile:async(req,res)=>{
        try {
         const {userId,name,contactno,city}=req.body
         const user=await Admin.findByIdAndUpdate(userId,{
             name,
             contactno,
             city
           
         })
         if(user){
             res.json({message:"Admin profile updated successfully",status:true})
         }else{
             res.json({
                 message:"Admin not found!!",status:false
             })
         }
        } catch (error) {
         console.log(error)
         res.json({message:error.message})
        }
        
},

sendreport:async(req,res)=>{
try {
    const {complaintId,policename}=req.body
const police=await Police.findOne({name:policename})
const complaint=await Complaint.findById(complaintId).populate('status')
complaint.status.policeId=police._id
complaint.status.save()
police.complaints.push(complaintId)
police.save()
complaint.save()

res.json({message:"complaint is sended to the police",status:true})
} catch (error) {
    console.log(error)
    res.json({message:error.message,status:false})
}
},


}

