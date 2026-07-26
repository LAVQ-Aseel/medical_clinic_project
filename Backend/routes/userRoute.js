const express=require("express")

const {register,login,getAllUsers,getUserById,updateUser}=require("../controller/userController")

const userRouter=express.Router()


userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.get("/getAllUser",getAllUsers)
userRouter.get("/getUser/:user_id",getUserById)
userRouter.put("/updateUser",updateUser)




module.exports=userRouter