const mongoose=require("mongoose")
const complaintStatus=new mongoose.Schema({
    complainId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Complaint',
    },
    status:{
        type:String,
        default:'Waiting'
    },
    policeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Police'
    },
description:{
type:String,
    }
},
{timestamps:true}
)

module.exports=new mongoose.model("ComplaintStatus",complaintStatus)