const { pool } = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllServices = (req, res) => {
  const sql = `
SELECT 
s.services_id,
s.services_name,
s.price,
s.image_url,
s.video_url
FROM services s 
ORDER BY s.services_id
`;
  pool
    .query(sql)
    .then(({ rows }) => {
      res.status(200).json({
        success: true,
        services: rows,
      });
    })
    .catch((err) => {
         console.log(err.message);
      res.status(500).json({
        success: false,
        message: "server error",
        err:err.message
    
     
      });
    });
};

const getServiceById=(req,res)=>{


const {services_id}=req.params


if(!services_id){
    return res.status(400).json({
        success:false,
        message:"id is required"
    })
}

 const sql=`
 SELECT 
 s.services_id,
s.services_name,
s.price,
s.image_url,
s.video_url
FROM services s 
WHERE s.services_id=$1
LIMIT 1
 
 `
pool.query(sql,[services_id])
.then(({rows})=>{
if(rows.length==0){
    return res.status(404).json({
        success:false,
        message:"service is not found"
    })
}
return res.status(200).json({
        success:true,
      services:rows[0]
    })


})

.catch((err)=>{
    console.log(err.message);
    
    res.status(500).json({
        success:false,
        message:"server error"
    })
})


}

module.exports={getAllServices,getServiceById}