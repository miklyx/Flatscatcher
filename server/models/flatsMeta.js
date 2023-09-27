'use strict';
const pool = require('./index');


exports.getStats = async (user) => {
  const sql = 'SELECT lag(dttm) over (order by dttm) as lastvisit, \
  total as all,lastcnt as new, applied  \
  FROM flatsmetagg \
  where user_id = $1 ORDER BY dttm desc limit 1';
  const values = [user.user_id];
  const res = await pool.query(sql, values);
  return res.rows[0];
};

//magic - runs stored function inside db - look in db for it
exports.updataLoginMeta = async (user) => {
  const sql = 'select lastvisit, total, lastcnt, applied, user_id from updatemetafunc($1)';
  const values = [user.user_id];
  
  console.log('backend user model'+user);
  const res = await pool.query(sql,values);
  return res.rows;
};


//TECH DEBT - made this for future, for now it's not called
exports.updateLogoutMeta = async (user) => {
  const sql = 'update flatsmeta set shown = 0 where user_id = $1';
  const values = [user.user_id];
  const res = await pool.query(sql, values);
  return res.rows;
};

