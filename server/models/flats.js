'use strict';
const pool = require('./index');
const client = require('./redis')


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
  return res.rows;
};

exports.getAll24 = async () => {
  /* const sql2 = 'SELECT \
  m.id, m.url, m.title, m.price as price, m.size as size, m.address as address, m.added_dttm\
  from messages24 m \
  where LENGTH(address)>6' */
  //console.log(client)
  const res = await (await client).SMEMBERS('flats_set', function(err, reply) {
    console.log(reply);
  });
  const fin = res.map(el => JSON.parse(el))
  return fin
  //const sql = 'SELECT * FROM flats_set'
  //const res = await client.query(sql)
  //return res.rows;
};

exports.getAllSorted24 = async () => {
  const res = await (await client).ZRANGE('flats_sorted_set', 0,-1, function(err, reply) {
    console.log(reply);
  });
  const fin = res.map(el => JSON.parse(el))
  return fin
}