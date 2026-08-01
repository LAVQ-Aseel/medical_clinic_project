const express=require("express")
const{getAllBooking,newBook,getBookByService,deleteBooking}=require("../controller/bookingController")

const bookingRoute=express.Router()
const authMiddelWare=require("../middleWare/authentication")
const athorMiddleWare=require("../middleWare/authorization")


bookingRoute.get("/getAllBook",authMiddelWare,athorMiddleWare("view"),getAllBooking)
bookingRoute.post("/newBook",authMiddelWare,athorMiddleWare("create"),newBook)
bookingRoute.get("/getBookBySer/:service_id",authMiddelWare,getBookByService)
bookingRoute.delete("/deleteBook/:book_id",authMiddelWare,athorMiddleWare("delete"),deleteBooking)



module.exports=bookingRoute