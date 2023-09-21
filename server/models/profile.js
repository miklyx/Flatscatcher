'use strict';
const pool = require('./index');


exports.getProfile = async () => {
  const res = await pool.query('SELECT 2');
  return res.rows;
};