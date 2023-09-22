'use strict';
const pool = require('./index');


exports.getProfile = async (data) => {
  console.log('passeddata = '+data)
  const res = await pool.query('SELECT id, pic_url, first_name, last_name, email, phone from profile where id = $1', [data.user_id]);
  return res.rows[0];
};

exports.updateProfile = async (data) => {
  //console.log(data)
  const sql = 'update profile set first_name = $1, last_name = $2, email = $3, phone = $4 where id = $5';
  const values = [data.firstName , data.lastName, data.email, data.phone, data.id];
  return await pool.query(sql, values);
}