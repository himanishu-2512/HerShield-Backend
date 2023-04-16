const router=require("express").Router()
const {register,login,forgotPassword,verifyToken,updateProfile,sendreport} =require("../controller/adminController")

router.post("/register",register)
router.post("/login",login)
router.post("/forgotPassword",forgotPassword)
router.post("/verifyToken",verifyToken)
router.post("/updateProfile",updateProfile)
router.post("/sendreport",sendreport)

module.exports=router