'use strict';
const pool = require('./index');

//gets profile metadata
exports.getProfileMeta = async data => {
  const res = await pool.query('SELECT id, price_max, size_min, district, rooms_min from profilemeta where id = $1', [data.user_id]);
  return res.rows[0];
};

//magic - runs stored function in db to update preferences and nearby tables according to it
exports.updatePreferences = async data => {
  const sql = 'select flat_id, preferred from updatepreferences($1, $2, $3, $4)';
  const values = [data.max_price , data.min_size, data.distr, data.user_id];
  return await pool.query(sql, values);
};

//sets flat as applied
exports.apply = data => {
  const sql = 'update flatsmeta set applied = 1 where id = $1 and user_id = $2';
  const values = [data.flat_id, data.user_id];
  return pool.query(sql, values);
};

//EXPERIMENTAL - see /service/getCoordinates.js
exports.pushCoordinates = data => {
  console.log(data)
  const sql = 'update flatsmeta set latitude = $3, longtitude = $4 where id = $1 and user_id = $2';
  const values = [data.flat_id, data.user_id, data.latitude, data.longtitude];
  return pool.query(sql, values);
};