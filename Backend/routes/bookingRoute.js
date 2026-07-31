const express=require("express")
const{getAllBooking,newBook,getBookByService}=require("../controller/bookingController")

const bookingRoute=express.Router()
const authMiddelWare=require("../middleWare/authentication")

bookingRoute.get("/getAllBook",getAllBooking)
bookingRoute.post("/newBook",authMiddelWare,newBook)
bookingRoute.get("/getBookBySer/:service_id",getBookByService)



module.exports=bookingRoute