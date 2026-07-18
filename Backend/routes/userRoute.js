const express=require("express")

const {register}=require("../controller/userController")

const userRouter=express.Router()


userRouter.post("/register",register)





module.exports=userRouter