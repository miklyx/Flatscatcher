'use strict';
const pool = require('./index');

exports.getProfileMeta = async data => {
  const res = await pool.query('SELECT id, price_max, size_min, district, rooms_min from profilemeta where id = $1', [data.user_id]);
  return res.rows;
};

exports.updatePreferences = data => {
  const sql = 'select flat_id, preferred from updatepreferences($1, $2, $3, $4, $5)';
  const values = [data.maxPrice , data.minSize, data.district, data.minRooms, data.id];
  return pool.query(sql, values);
}

exports.apply = data => {
  const sql = 'update flatsmeta set applied = 1 where id = $1 and user_id = $2';
  const values = [data.flat_id, data.user_id];
  return pool.query(sql, values);
}
