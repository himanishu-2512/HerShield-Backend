const route=require("express").Router()

const {register,login}=require("../controller/policeController")

route.post("/register",register)



module.exports=route

