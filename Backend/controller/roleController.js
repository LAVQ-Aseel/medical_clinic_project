const { pool } = require("../models/db");

const getAllRole = (req, res) => {
  const sql = `SELECT * FROM role ORDER BY role_id ASC 
    `;
  pool
    .query(sql)
    .then(({ rows }) => {
      return res.status(200).json({
        success: true,
        role: rows,
      });
    })

    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err.message,
      });
    });
};

const createRole = (req, res) => {
  const { role_name } = req.body;
  if (!role_name) {
    return res.status(400).json({
      success: false,
      message: "role name is required",
    });
  }

  const sql = `
INSERT INTO role (role_name) VALUES($1) RETURNING *

`;
  pool
    .query(sql, [role_name])
    .then(({ rows }) => {
      return res.status(201).json({
        success: true,
        message: "Role Created Successfully",
        role: rows[0],
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "server error",
        error: err.message,
      });
    });
};

const deleteRole = (req, res) => {
  const { role_id } = req.params;
  if (!role_id) {
    return res.status(400).json({
      success: false,
      message: "Id is required",
    });
  }

  const sql = `
DELETE FROM role WHERE role_id=$1 RETURNING *

`;
  pool
    .query(sql, [role_id])
    .then(({ rows }) => {
      if (rows.length == 0) {
        res.status(404).json({
          success: false,
          message: "Role is not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Role Deleted Successfully",
        deleted: rows[0],
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "server error",
        error: err.message,
      });
    });
};

const updateRole = (req, res) => {
  const { role_id } = req.params;
  const { role_name } = req.body;

  if (!role_name) {
    return res.status(400).json({
      success: false,
      message: "Role Name Is Required",
    });
  }

  const sql = `
UPDATE role SET 
role_name =$1,
WHERE role_id=$2
RETURNING *

`;
  pool.query(sql, [role_name, role_id]).then(({ rows }) => {
    if (rows.length == 0) {
      return res.status(404).json({
        success: false,
        message: "Role is not found",
      });
    }
    return res
      .status(200)
      .json({
        success: true,
        message: "Role Updeted Successfully",
        role: rows[0],
      })

      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "server error",
          error: err.message,
        });
      });
  });
};

module.exports = { getAllRole, createRole, deleteRole,updateRole };
