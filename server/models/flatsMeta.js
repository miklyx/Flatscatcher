'use strict';
const pool = require('./index');


exports.getStats = async () => {
  const res = await pool.query('SELECT lag(dttm) over (order by dttm desc) as lastvisit, total as all,lastcnt as new, applied  FROM flatsmetagg ORDER BY dttm limit 1');
  return res.rows;
};

exports.updataMeta = async () => {
  const res = await pool.query('CALL public.updatemeta()');
  return res;
}