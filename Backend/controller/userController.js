const {pool}=require("../models/db.js");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");


const register=(req,res)=>{
    const{username,email,password,phonenumber,age,gender}=req.body;

    if(!username || !email || !password ||!phonenumber ||!age || !gender){
        return res.status(400).json({
    success:false,
    message:"username,email,password,phonenumber,age,gender are required"
    })
}

bcrypt.hash(password,12).then((passwordhash)=>{
    const insertQuery=`INSERT INTO users (username ,email ,password ,phonenumber ,age ,gender) VALUES($1,$2,$3,$4,$5,$6) 
    RETURNING *`;
     
    const values=[
        username,
        email.trim().toLowerCase(),
        passwordhash,
        phonenumber,
        age,
        gender
    ]
return pool.query(insertQuery,values)
.then((result)=>{
    res.status(201).json({
        success:true,
        message:"Acount Created Successfully",
        user:result.rows[0]
    })
}).catch((err)=>{
if(err.code == 23505){
    return res.status(409).json({
        success:false,
        message:"email already exist"
    })
}

res.status(500).json({
    success:false,
    message:"Server Error",
    err:err.message
})
})


})
}




const login=(res,req)=>{

    const email=req.body.email.trim().toLowerCase()
    const password=body.req.password

    if(!email || !password){
        return res.status().json({
            success:false,
            message:"email & password are required"
        })
    }

    const selectQuery=`
    SELECT 
    u.user_id,
    u.username AS fullName,
    u.email,
    u.password,
    u.phonenumber AS phoneNumber,
    u.age,
    u.gender,
    u.role_id,
    r.role_name AS roleName
    FROM users u
    LIFT JOIN role r ON role_id=u.role_id
    WHERE u.email=$2 `

pool.query(selectQuery,[email])
.then((result)=>{
if(result.rows.length==0){
    return res.status(403).json({
        success:"false",
        message:"email is does't exist or password is incorrect"
    })
}






}).catch(()=>{})

}



module.exports={register}