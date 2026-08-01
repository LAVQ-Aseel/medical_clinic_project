const { pool } = require("../models/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
  const { username, email, password, phonenumber, age, gender } = req.body;

  if (!username || !email || !password || !phonenumber || !age || !gender) {
    return res.status(400).json({
      success: false,
      message: "username,email,password,phonenumber,age,gender are required",
    });
  }

  bcrypt.hash(password, 12).then((passwordhash) => {
    const insertQuery = `INSERT INTO users (username ,email ,password ,phonenumber ,age ,gender) VALUES($1,$2,$3,$4,$5,$6) 
    RETURNING *`;

    const values = [
      username,
      email.trim().toLowerCase(),
      passwordhash,
      phonenumber,
      age,
      gender,
    ];
    return pool
      .query(insertQuery, values)
      .then((result) => {
        res.status(201).json({
          success: true,
          message: "Acount Created Successfully",
          user: result.rows[0],
        });
      })
      .catch((err) => {
        if (err.code == 23505) {
          return res.status(409).json({
            success: false,
            message: "email already exist",
          });
        }

        res.status(500).json({
          success: false,
          message: "Server Error",
          err: err.message,
        });
      });
  });
};

const login = (req, res) => {
  const email = req.body.email.trim().toLowerCase();
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "email & password are required",
    });
  }

  const selectQuery = `
    SELECT 
    u.user_id,
    u.username AS "fullName",
    u.email,
    u.password,
    u.phonenumber AS "phoneNumber",
    u.age,
    u.gender,
    u.role_id,
    r.role_name AS "roleName",
    COALESCE(ARRAY_AGG(p.permission_name) FILTER (WHERE p.permission_name IS NOT NULL), '{}') AS permissions
    FROM users u
    LEFT JOIN role r ON r.role_id=u.role_id
     LEFT JOIN role_permission rp ON rp.role_id = r.role_id
    LEFT JOIN permission p ON p.permission_id=rp.permission_id
   
    WHERE u.email=$1 
    GROUP BY u.user_id, r.role_id`;

  pool
    .query(selectQuery, [email])
    .then((result) => {
      if (result.rows.length == 0) {
        return res.status(403).json({
          success: "false",
          message: "email is does't exist or password is incorrect",
        });
      }
      const user = result.rows[0];
      console.log(user);

      return bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(403).json({
            success: false,
            message: "email or password is incorrect",
          });
        }
        const payload = {
          userId: user.user_id,
          roleId: user.role_id,
          roleName: user.role_name,
          permission: user.permission_name,
        };
        const token = jwt.sign(payload, process.env.SECRET, {
          expiresIn: "24h",
        });
        return res.status(200).json({
          success: true,
          message: "login credintiales",
          token,
          user: {
            id: user.user_id,
            fullname: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            age: user.age,
            gender: user.gender,
            roleId: user.role_id,
            roleName: user.roleName,
            permissions: user.permissions,
          },
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};

const getAllUsers = (req, res) => {
  const sql = `
    SELECT
    u.user_id,
    u.username,
    u.email,
    u.phonenumber,
    u.age,
    u.gender,
    u.role_id
    FROM users u
    ORDER BY user_id ASC
    `;
  pool
    .query(sql)
    .then(({ rows }) => {
      res.status(200).json({
        success: true,
        users: rows,
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

const getUserById = (req, res) => {
  const { user_id } = req.params;
  const userId = user_id;

  if (!userId) {
    return res.status(400).json({
      success: "false",
      message: "id is required",
    });
  }

  const sql = `
    SELECT 
    u.user_id ,
    u.username AS fullName,
    u.email,
    u.phonenumber,
    u.age,
    u.gender,
    u.role_id ,
    r.role_name
    FROM users u
    LEFT JOIN role r ON u.role_id=r.role_id
    WHERE u.user_id=$1
    LIMIT 1`;

  pool
    .query(sql, [user_id])
    .then(({ rows }) => {
      if (rows.length == 0) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      return res.status(200).json({
        success: "true",
        user: rows[0],
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

const updateUser = (req, res) => {
  const { user_id } = req.params;
  const { username, email, phonenumber, age, gender } = req.body;

  const sql = `
UPDATE users
SET 
username   =  COALESCE($1,username),
email     =    COALESCE($2,email),
phonenumber   =  COALESCE($3,phonenumber),
age  =  COALESCE($4,age),
gender =  COALESCE($5,gender)
  
WHERE user_id=$6
  RETURNING *
  `;
  pool
    .query(sql, [username, email, phonenumber, age, gender, user_id])
    .then((result) => {
      if (result.rows.length == 0) {
        return res.status(404).json({
          success: false,
          message: "user not found",
        });
      }

      res.status(200).json({
        success: true,
        user: result.rows[0],
      });
    })

    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: err.message,
      });
    });
};

module.exports = { register, login, getAllUsers, getUserById, updateUser };
