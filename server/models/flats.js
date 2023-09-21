'use strict';
const pool = require('./index');


exports.getAll = async () => {
  const res = await pool.query('SELECT id, image, url, title, price, size, rooms, address FROM clear');
  return res.rows;
};

exports.getStats = async () => {
  const res = await pool.query('SELECT lag(dttm) over (order by dttm desc) as lastvisit, total as all,lastcnt as new, applied  FROM flatsmetagg ORDER BY dttm limit 1');
  return res.rows;
};

exports.updataMeta = async () => {
  const res = await pool.query('CALL public.updatemeta()');
  return res;
}

exports.getProfile = async () => {
  const res = await pool.query('SELECT 2');
  return res.rows;
};

exports.getProfileMeta = async () => {
  const res = await pool.query('SELECT 1');
  return res.rows;
};




exports.set = flat => {
  const sql = 'INSERT INTO TODO ("authorId", content, timestamp) VALUES ($1, $2, $3)';
  const values = [msg.authorId, msg.content, Date.now()];
  return pool.query(sql, values);
};