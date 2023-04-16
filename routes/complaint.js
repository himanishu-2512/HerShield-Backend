const router=require("express").Router()
const {register,complaintall,complaintuser,complaintpolice,complaintuseradmin,complaintuserpolice,registerwitness} =require("../controller/complaintController")


router.get("/all",complaintall)
router.post("/register",register)
//userId,name,phone,email,designation,contactno,adhaar,organisationname,organisationemail,
//organisationphone,organisationhead,organisationstate,
//organisationdistrict,organisationaddress, offendersname,offendersdesignation,offendersworkingrelationship
router.get("/user",complaintuser)//userId
router.post("/register/witness",registerwitness)//userId,
//name,phone,email,designation,contactno,adhaar,organisationname,organisationemail,orgnisationhead,
//organisationstate,organisationphone,organisationdistrict,organisationaddress,
//offendersname,offendersdesignation,offendersworkingrelationship,victimname,victimphone, victimemail,
//victimdesignation,victimworkingrealtionship
router.get("/usercomplaint",complaintuseradmin)//email {of user}

// router.get("/")
module.exports=router