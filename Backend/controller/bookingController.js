const { pool } = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getAllBooking = (req, res) => {
  const sql = `
SELECT 
b.book_id,
b.user_id,
b.user_name,
b.service_id, 
b.service_name,
b.time
FROM booking b
LEFT JOIN users u ON b.book_id=u.user_id

 ORDER BY b.book_id ASC

`;

  pool
    .query(sql)
    .then(({ rows }) => {
      res.status(200).json({
        success: true,
        booking: rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "server error",
        err: err.message,
      });
    });
};

const newBook = async (req, res) => {
  const userId = req.user.userId;
  const { user_name, service_name, service_id, time } = req.body;

  try {
    const sql = `
INSERT INTO booking (user_id,user_name,service_id,service_name,time) 
VALUES ($1,$2,$3,$4,$5)
RETURNING *
`;

    const result = await pool.query(sql, [
      userId,
      user_name,
      service_id || null,
      service_name || null,
      time || null,
    ]);

    res.status(201).json({
      success: true,
      message: "created successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

const getBookByService = (req, res) => {
  const { service_id } = req.params;

  if (!service_id) {
    return res.status(400).json({
      success: false,
      message: "service id is required",
    });
  }

  const sql = `
    SELECT
b.book_id,
u.username,
s.services_name,
b.time
FROM booking b
LEFT JOIN services s ON b.service_id=b.service_id
LEFT JOIN users u ON b.user_id=u.user_id
WHERE b.service_id=$1
    

    `;
  pool
    .query(sql, [service_id])
    .then(({ rows }) => {
      if (rows.length == 0) {
        return res.status(404).json({
          success: false,
          message: "no booking yet",
        });
      }
      return res.status(200).json({
        success: true,
        booking: rows,
      });
    })

    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "server error",
        error: err.message,
      });
    });
};
  

const deleteBooking=(req,res)=>{
    const{book_id}=req.params
if(!book_id){
    return res.status(400).json({
        success:false,
        message: "id is requierd"
    })
}


const sql=`
DELETE FROM booking 
WHERE book_id=$1
RETURNING *

`

pool.query(sql,[id]).then(({rows})=>{
if(rows.length==0){
return res.status(404).json({
success:false,
message:"booking is not found"

})
}

return res.status(200).json({
success:true,
message:"booking is deleted"





}).catch((err)=>{
    return res.status(500).json({
success:false,
message:"server error",
error:err.message

    })

})



})
}
module.exports = { getAllBooking, newBook, getBookByService,deleteBooking };
