const express=require("express");
require("dotenv").config();
const app=express();
const PORT=5000;

app.use(express.json());

const userRouter=require("./routes/userRoute")
const servicesRoute=require("./routes/serviceRoute")
const bookingRoute=require("./routes/bookingRoute")
const roleRoute=require("./routes/roleRoute")



app.use("/user",userRouter)
app.use("/services",servicesRoute)
app.use("/booking",bookingRoute)
app.use("/role",roleRoute)




app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
