const express=require("express");
require("dotenv").config();
const app=express();
const PORT=5000;

app.use(express.json());

const userRouter=require("./routes/userRoute")








app.use("/user",userRouter)
app.use("/user",userRouter)



app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
