const mongoose=require("mongoose");
const witnessComplaintSchema=new mongoose.Schema({
    userId:{
type:mongoose.Schema.Types.ObjectId
    },
    name:{
        type:String,
        required:true,
        
    },
    phone:{
        type:String,
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
    victimname:{
        type:String,
        required:true,
    },
    victimphone:{
        type:String,
        required:true,
    },
    victimemail:{
        type:String,
        required:true,
    },
    victimdesignation:{
        type:String,
        required:true,
    },
    victimworkingrelationship:{
        type:String,
        required:true,
    },
    organisationname:{
        type:String,
        required:true,
    },
    organisationphone:{
      type:String,
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
},
{ timestamps: true }
)

module.exports=new mongoose.model('WitnessComplaint',witnessComplaintSchema)
