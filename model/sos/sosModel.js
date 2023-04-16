const mongoose=require("mongoose")
const sosSchema=new mongoose.Schema({
userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
},
policeId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Police'
},
status:{
    type:String,
    enum:["Active","Safe","Rescued","False SOS"]
},
longitude:{
    type:String,
    
},
latitude:{
type:String,
}



}
,{timestamps:true})

module.exports=new mongoose.model("SOS",sosSchema)
