const express=require("express")
const{getAllServices,getServiceById,updateService}=require("../controller/serviceConroller")


const servicesRoute=express.Router()

servicesRoute.get("/getAllServices",getAllServices)
servicesRoute.get("/getServices/:services_id",getServiceById)
servicesRoute.put("/updateServices",updateService)


module.exports=servicesRoute