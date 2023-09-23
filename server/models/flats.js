'use strict';
const pool = require('./index');


exports.getAll = async () => {
  const res = await pool.query('SELECT id, image, url, title, price, size, rooms, address FROM clear order by "false" desc');
  return res.rows;
};
