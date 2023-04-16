const router=require("express").Router()
const {register,complaintall,complaintuser,complaintpolice,complaintuseradmin,complaintuserpolice} =require("../controller/complaintController")


router.get("/all",complaintall)
router.post("/register",register)
router.get("/user",complaintuser)
router.get("/usercomplaint",complaintuseradmin)
module.exports=router