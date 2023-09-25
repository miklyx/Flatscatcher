'use strict';
const pool = require('./index');


exports.getAll = async () => {
  const sql = 'SELECT clr.id, clr.image, clr.url, clr.title, dm.prc as price, dm.sz as size, dm.rom as rooms, dm.adr as address, f.applied, f.preferred, clr.address as fulladr,\
  f.latitude, f.longitude\
  FROM clear clr\
  join dm_wng_clr dm\
  on dm.id = clr.id and dm.adr is not null\
  join flatsmeta f\
  on f.id = clr.id\
  where dm.adr is not null\
  order by clr.id desc'
  const res = await pool.query(sql)
  //const res = await pool.query('SELECT id, image, url, title, price, size, rooms, address FROM clear order by "false" desc');
  return res.rows;
};
