'use strict';
const pool = require('./index');

exports.getProfileMeta = async () => {
  const res = await pool.query('SELECT 1');
  return res.rows;
};