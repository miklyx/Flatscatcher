'use strict';
const pool = require('./index');


exports.getProfile = async (data) => {
  const res = await pool.query('SELECT id, pic_url, first_name, last_name, email, phone from profile where id = $1', [data.user_id]);
  return res.rows[0];
};

exports.updateProfile = async (data) => {
  const sql = 'update profile\
                set first_name = $1, last_name = $2, phone = $3\
                where id = $4';
  const values = [data.first_name , data.last_name, data.phone, data.user_id];
  return await pool.query(sql, values);
};