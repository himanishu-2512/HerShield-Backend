const router=require("express").Router()
const {register,complaintall,complaintuser,complaintallwitness,complaintpolice,complaintuseradmin,complaintuserpolice,registerwitness, witnessuser,witnessall, onecomplaintbyid, onewitnesscomplaintbyid, onesosbyid} =require("../controller/complaintController")


router.get("/all",complaintall)
router.get("/all/witness",complaintallwitness)
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
router.get("/userwitness",witnessuser)
router.get("/complaint/one",onecomplaintbyid)
router.get("/complaint/witness/one",onewitnesscomplaintbyid)
router.get("/sos/one",onesosbyid)
// router.get("/")
module.exports=router