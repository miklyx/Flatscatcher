'use strict';
const pool = require('./index');


exports.getStats = async (user) => {
  const sql = 'SELECT lag(dttm) over (order by dttm) as lastvisit, total as all,lastcnt as new, applied  FROM flatsmetagg where user_id = $1 ORDER BY dttm desc limit 1'
  console.log(user.user_id)
  const values = [user.user_id]
  const res = await pool.query(sql, values);
  return res.rows;
};

exports.updataLoginMeta = async (user) => {
  const sql = 'select lastvisit, total, lastcnt, applied, user_id from updatemetafunc($1)'
  const values = [user.user_id]
  //console.log(user.user_id)
  const res = await pool.query(sql,values);
  return res.rows;
};

exports.updateLogoutMeta = async (user) => {
  const sql = 'update flatsmeta set shown = 0 where user_id = $1'
  const values = [user.user_id]
  const res = await pool.query(sql, values);
  return res.rows;
}

exports.applyTo = async data => {
  const res = await pool.query('insert into table applied')
  return res.rows
}

exports