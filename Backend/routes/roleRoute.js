const express=require("express")

const {getAllRole,createRole,deleteRole,updateRole}=require("../controller/roleController")
const authentication = require("../middleWare/authentication")
const authorization = require("../middleWare/authorization")

const roleRoute=express.Router()

roleRoute.get("/getAllRole",getAllRole)
roleRoute.post("/newRole",authentication,authorization("create"),createRole)
roleRoute.delete("/deleteRole",authentication,authorization("delete"),deleteRole)
roleRoute.put("/deleteRole",authentication,authorization("update"),updateRole)



module.exports=roleRoute