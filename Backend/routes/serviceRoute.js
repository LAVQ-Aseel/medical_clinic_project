const express=require("express")
const{getAllServices,getServiceById}=require("../controller/serviceConroller")


const servicesRoute=express.Router()

servicesRoute.get("/getAllServices",getAllServices)
servicesRoute.get("/getServices/:services_id",getServiceById)



module.exports=servicesRoute