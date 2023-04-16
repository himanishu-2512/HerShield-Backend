const User =require("../model/user/userModel")
const Token=require("../model/user/tokenModel")
const bcrypt=require("bcrypt")
const sendMail=require("../utils/nodemailer")
const axios = require("axios");
const rapidapi=require("rapidapi")
require("dotenv").config()
module.exports={
//registration of user
register:async(req,res)=>{
try {
const {name,email,contactno,password}=req.body
const USER =(await User.findOne({ email: email }))
if (USER){
      res.send({ message: "User already registered",status:false });}

const hashedpass=await bcrypt.hash(password,10)
const user=await User.create({
name,
email,
contactno,
password:hashedpass,
})

if(user){
    await user.save()
    const token = await Token.create({
        userId: user._id,
        token: Math.floor(Math.random()*1000000),
      });
      if(token){
      await sendMail(
        user.email,
        "HerShield Verification Code",
        `Hello, this is the OTP requested for verification, the token will be valid only for 1 hour!!! ${token.token}`
      )
     
    res.json({
        message:"user registered suceesfully and sent a mail on your email address",status:200,result:true})

}
    else{
        res.json({
            message:"user registered suceesfully",status:200,result:true
        }) 

    }
}
else{
    res.json({message:"User not able to registered",status:400,result:false})
}

} catch (error) {
    console.log(error,false)
    res.json({message:error.message,status:400,result:false})

}

},
//login of user
login:async(req,res)=>{
try {
    const {email,password}=req.body
    const user=await User.findOne({email})
    if(user){
      
        const pass=await bcrypt.compare(password,user.password)
        if(pass){
            res.json({message:"Login Successful",status:true,user})
        }else{
            res.json({message:"password is wrong",status:false})
        }}
        else{
           
            const token = await Token.create({
                userId: user._id,
                token: Math.floor(Math.random()*1000000),
              });
              if(token){
              const send = await sendMail(
                user.email,
                "HerShield Verification Code",
                `Hello, this is the OTP requested for verification, the token will be valid only for 1 hour!!! ${token.token}`
              );
               
            
        }

    }else{
        res.json({message:"email is wrong!",status:false})
    }
   
} catch (error) {
    console.log(error)
    res.json({message:error.message,status:false})
}
}
,
//forgot Password for user
forgotPassword:async(req,res)=>{
try {
    const {email}=req.body
const user=await User.findOne({email})
if(user){
    const token = await Token.create({
        userId: user._id,
        token: Math.floor(Math.random()*1000000),
      });
      const send = await sendMail(
        user.email,
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
		const user = await User.findOne({ email })
		const tokenn = Token.findOne({ token: token, userId: user._id });
		if (tokenn) {
			const id = user._id;
			const hashedpassword = await bcrypt.hash(password, 10);
			const updateduser = await User.findByIdAndUpdate(
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
//verifying email after registration
verifyEmail:async(req,res)=>{
    try {
		const { token,email } = req.body;
		const user = await User.findOne({ email })
		const tokenn = Token.findOne({ token: token, userId: user._id });
		if (tokenn) {
			const id = user._id;
			
			const updateduser = await User.findByIdAndUpdate(
				id,
				{
					
                    isVerified:true,
				},
				{ new: true }
			);
			if (updateduser) res.json({ message: "email verified  sucessfully", status: true, updateduser });
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
//adhaar number
adhaarcard:async(req,res)=>{
  try {
    const {adhaar,userId}=req.body
const user=await User.findById(userId)
if(user){
    const encodedParams = new URLSearchParams();
    encodedParams.append("clientid", "222");
    encodedParams.append("uidnumber", adhaar);
    encodedParams.append("consent", "Y");
    encodedParams.append("txn_id", "3ed268c4-e8b8-11ec-8fea-0242ac120002");
    encodedParams.append("method", "emailnmobilev2");
    encodedParams.append("mobileNumber",user.contactno);
    const options = {
      method: 'POST',
      url: 'https://verify-aadhaar-mobile-email-link.p.rapidapi.com/Uidverifywebsvcv1/VerifyEmailMobilelink',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': process.env.rapidapi,
        'X-RapidAPI-Host': process.env.rapidapihost,
      },
      data: encodedParams
    };
    
   const request= await axios.request(options)
if(request){
    console.log(request.data.Succeeded.Uid_Details.responseData.status)
    if(request.data.Succeeded.Uid_Details.responseData.status=="Success"){
    user.adhaarno=adhaar
    user.save()
    res.json({message:"adhaar card verified",status:true})}
    else 
    res.json({message:"adhaar card verifcation failed",status:true})
}
else{
    res.json({message:"adhaar number is not linked with this phone number"})
}
}
} catch (error) {
    console.log(error)
    res.json({message:error.message,status:false})
  }
},
//updateprofile
updateProfile:async(req,res)=>{
   try {
    const {userId,city,working,emergency}=req.body
    const user=await User.findByIdAndUpdate(userId,{
        city,
        working,
        emergency
    })
    if(user){
        res.json({message:"User profile updated successfully",status:true})
    }else{
        res.json({
            message:"User not found!!",status:false
        })
    }
   } catch (error) {
    console.log(error)
    res.json({message:error.message})
   }
   


},
updateContacts:async(req,res)=>{
    try {
        const {userId,emergency}=req.body
        const user=await User.findByIdAndUpdate(userId,{
    
            emergency
        })
        if(user){
            res.json({message:"Emergency contacts updated successfully",status:true,user })
            
        }else{
            res.json({
                message:"User not found!!",status:false
            })
        }
       } catch (error) {
        console.log(error)
        res.json({message:error.message})
       }
},

allusers:async(req,res)=>{
    try {
        console.log("yes")
        const limit=req.query.limit
        const skip=req.query.skip
        const user=await User.find({}).skip(skip).limit(limit)
        if(user)
        res.json({message:"these are all users",user})
        else{
            console.log("error")
        }
    } catch (error) {
        console.log(error)
    }
},
statusindividual:async(req,res)=>{
    try {
        const {userId,complainId}=req.body
        const complaint=await Complaint.findById(complainId)
        if(complaint.userId==userId){
            
        }
        
    } catch (error) {
        
    }
    }

}

