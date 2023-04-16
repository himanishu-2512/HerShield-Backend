const mongoose=require("mongoose")
const policeSchema=new mongoose.Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    require:true,
    unique:true
},
contactno:{
    type:Number,
    require:true,
},
password:{
    type:String,
    require:true,
},

policestationcode:{
    type:Number,
    required:true,
},
city:{
    type:String,
    required:true,
},

complaints:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Complaint"
    }
]
});
module.exports=new mongoose.model("Police",policeSchema);