const mongoose=require("mongoose")
const adminSchema=new mongoose.Schema({
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
isVerified:{
    type:Boolean,
    default:false,
},

city:{
    type:String,
    required:true,
},

police:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Police"
    }
]
});
module.exports=new mongoose.model("Admin",adminSchema);