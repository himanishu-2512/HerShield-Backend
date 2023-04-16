const express=require("express")
const cors=require("cors")
const app=express()
app.use(express.json())
const authroutes=require("./routes/user")
const postroutes=require("./routes/post")
const commentroutes=require("./routes/comment")
const complaintroutes=require("./routes/complaint")
const adminroutes=require("./routes/admin")
require("dotenv").config()
app.use(cors())
const { default: mongoose } = require("mongoose")
const PORT=process.env.PORT

mongoose.connect(process.env.uri,
    { useNewUrlParser: true, useUnifiedTopology: true })
.then(
    console.log("db connection sucessful")
).catch((error)=>{
    console.log(error)
})


//routes
app.use('/api/auth',authroutes)
app.use('/api/posts',postroutes)
app.use('/api/posts/comment',commentroutes)
app.use('/api/complaint',complaintroutes)
app.use("api/admin",adminroutes)

app.get("/",(req,res)=>{
    console.log("Hello What are you doing")
    res.json({message:"hello"})
})
app.listen(PORT,(req,res)=>{
    console.log("Server is running on port 8000")
})