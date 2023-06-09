const mongoose=require("mongoose");
const complaintSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    name:{
        type:String,
        required:true,
        
    },
    phone:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    designation:{
        type:String,
        required:true,
    },
    contactno:{
        type:Number,
        required:true,
    },
    adhaar:{
        type:String,
        required:true,
    },
    organisationname:{
        type:String,
        required:true,
    },
    organisationphone:{
      type:Number,
      required:true,
    },
    organisationemail:{
        type:String,
        required:true,
    },
    
    organisationhead:{
        type:String,
        required:true,
    },
    organisationstate:{
        type:String,
        required:true,
    },
    organisationdistrict:{
        type:String,
        required:true,
    },
    organisationaddress:{
        type:String,
        required:true,
    },
    offendersname:{
        type:String,
        required:true,
    },
offendersdesignation:{
    type:String,
    required:true,
} ,
offendersworkingrelationship:{
    type:String,
    required:true,
},
status:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'ComplaintStatus',
}
},
{ timestamps: true }
)
module.exports=new mongoose.model("Complaint",complaintSchema)