const Complaint=require("../model/complaint/complaintModel")
const User=require("../model/user/userModel")
const Police=require("../model/Police/Police")

const WitnessComplaint=require("../model/complaint/complaintwitness")

module.exports={
register:async(req,res)=>{
    try {
        const {userId,name,phone,email,designation,contactno,adhaar,organisationname,organisationemail,organisationphone,organisationhead,organisationstate,organisationdistrict,organisationaddress, offendersname,offendersdesignation,offendersworkingrelationship}=req.body
        const user=await User.findById(userId)
        if(user){
    const complaint=await Complaint.create({
        userId,
        name,
        phone,
        email,
        designation,
        contactno,
        adhaar,
        organisationname,
        organisationemail,
        organisationhead,
        organisationstate,
        organisationphone,
        organisationdistrict,
        organisationaddress,
        offendersname,
        offendersdesignation,
        offendersworkingrelationship
    })
if(complaint){
   await user.complaints.push(complaint._id)
   await user.save()
res.json({message:"compalaint registered sucessfully",status:true})}
else
res.json({message:"complaint not registered successfully",status:false})}

else 
res.json({message:"user is not registered!!",status:false})

    } 
    catch (error) {
        console.log(error)
        res.json({message:error.message,status:false})
    }

},
registerwitness:async(req,res)=>{
    try {
        const {userId,name,phone,email,designation,contactno,adhaar,organisationname,organisationemail,organisationphone,organisationhead,organisationstate,organisationdistrict,organisationaddress, offendersname,offendersdesignation,offendersworkingrelationship,victimname,victimphone, victimemail,victimdesignation,victimworkingrelationship}=req.body
        const user=await User.findById(userId)
        if(user){
    const complaint=await WitnessComplaint.create({
        userId,
        name,
        phone,
        email,
        designation,
        contactno,
        adhaar,
        organisationname,
        organisationemail,
        organisationhead,
        organisationstate,
        organisationphone,
        organisationdistrict,
        organisationaddress,
        offendersname,
        offendersdesignation,
        offendersworkingrelationship,
        victimname,victimphone, victimemail,victimdesignation,victimworkingrelationship
    })
if(complaint){
   await user.witnesscomplaints.push(complaint._id)
   await user.save()
res.json({message:"compalaint registered sucessfully",status:true})}
else
res.json({message:"complaint not registered successfully",status:false})}

else 
res.json({message:"user is not registered!!",status:false})

    } 
    catch (error) {
        console.log(error)
        res.json({message:error.message,status:false})
    }
},
complaintall:async(req,res)=>{
    try {
        let {skip,limit}=req.query

   const complaint=await Complaint.find().skip(skip).limit(limit)
    if(complaint)
    res.json({message:"These are the complaints",status:true,complaint})
    else
    res.json({message:"something went wrong",status:false})
    } catch (error) {
        
        console.log(error)
        res.json({message:error.message,status:false});
    }


},
complaintallwitness:async(req,res)=>{
    try {
        let {skip,limit}=req.query

   const complaint=await WitnessComplaint.find().skip(skip).limit(limit)
    if(complaint)
    res.json({message:"These are the complaints",status:true,complaint})
    else
    res.json({message:"something went wrong",status:false})
    } catch (error) {
        
        console.log(error)
        res.json({message:error.message,status:false});
    }


},
complaintuser:async(req,res)=>{
    try {
        const {skip,limit}=req.query
        const {userId}=req.body
    const complaint=await User.find({_id:userId}).skip(skip).limit(limit).populate({path:"complaints"});
    if(complaint)
    res.json({message:"These are the complaints",status:true,complaint})
    else
    res.json({message:"something went wrong",status:false})
    } catch (error) {
        
        console.log(error)
        res.json({message:error.message,status:false});
}
},
complaintpolice:async(req,res)=>{
    try {
        const {skip,limit}=req.query
        const {policeId}=req.body
    const complaint=await Police.findAll({_id:policeId}).skip(skip).limit(limit).populate();
    if(complaint)
    res.json({message:"These are the complaints",status:true,complaint})
    else
    res.json({message:"something went wrong",status:false})
    } catch (error) {
        
        console.log(error)
        res.json({message:error.message,status:false});
}

},
complaintuseradmin:async(req,res)=>{
try {
    const {email}=req.body
const user=await User.find({email}).populate({path:'complaints'})

if(user)
res.json({message:"request sucessful",status:true,user})
else
res.json({message:"request unsucessful",status:false})


} catch (error) {
    console.log(error)
    res.json({message:error.message,status:false})
}


},
complaintuserpolice:async(req,res)=>{
    const {policeId,complaintId}=req.body
    const police=await Police.find(policeId)
    const complaint=await Complaint.find()
}

}