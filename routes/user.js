const express=require("express")
const route=express.Router()
const {register,login,forgotPassword,verifyToken,verifyEmail, adhaarcard, updateProfile, updateContacts,allusers,createsos, activepin, falsesos, safesos, soshistory} =require("../controller/userController")
route.post("/register",register)//name,email,password,contactno
route.post("/login",login)//email,password
route.post("/forgotpassword",forgotPassword)//email
route.post("/verifytoken",verifyToken)//email,token,new password
route.post("/verifyemail",verifyEmail)//token,email
route.post("/adhaar",adhaarcard)//userId,adhaar
route.post("/updateprofile",updateProfile)//userId,city,working,emergency
route.post("/updateemergency",updateContacts)//userId,emergency
route.get("/allusers",allusers)//req should be like /allusers?limit={limit}&skip={skip}
route.post("/sos",createsos)//userId,longitude,latitude
route.post("/activepin",activepin)//userId,activepin
route.post("/falsesos",falsesos)//userId,activepin,sosId
route.post("/safesos",safesos)//userId,activepin,sosId
route.get("/soshistory",soshistory)//userId
module.exports=route