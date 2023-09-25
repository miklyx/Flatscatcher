//EXPRTIMENTAL - GET COORDINATES VIA EXTENAL API
const { Pool } = require('pg');

const pool = new Pool({
  user: 'flathunter',
  host: 'localhost',
  database: 'flathunter',
  password: 'flathunter',
  port: 5432
});

module.exports = pool;


const getAddressesFromDatabase = async () => {
  try {
    const sql = 'select clr.id, clr.address as adr\
    FROM clear clr\
    join dm_wng_clr dm\
    on dm.id = clr.id and dm.adr is not null\
    join flatsmeta f\
    on f.id = clr.id\
    where dm.adr is not null\
    and f.preferred = 1\
    order by clr.id desc'; 
    const result = await pool.query(sql);
    const addresses = result.rows//.map(row => row.adr);
    return addresses;
  } catch (error) {
    console.error('err get:', error);
    throw error;
  }
};

const fetchCoordinatesForAddress = async (address) => {
  try {
    const coordinates = await getCoordinates(address);
    return coordinates;
  } catch (error) {
    console.error(`err read ${address}:`, error);
    throw error;
  }
};

const getCoordinates = async (adr) => {
  try {
    const geoURL = 'https://api.geoapify.com/v1/geocode/search?text=';
    const apiAdr = 'apiKey=eee1cb95010b46c495452f1642cc866d';
    const response = await fetch(`${geoURL}${adr}&${apiAdr}`, {
      method: "GET",
      headers: { "Content-Type": 'application/json' },
    });
    const data = await response.json();
    return data.features[0].geometry.coordinates;
  } catch (e) {
    console.log(e);
    throw e; 
  }
};

const pushCoordinatesOnceModel = async (data) => {
  //console.log(data)
  const sql = 'update flatsmeta set latitude = $2, longitude = $3 where id = $1';
  const values = [data.flat_id, data.latitude, data.longitude];
  try {
    await pool.query(sql, values);
    console.log('GOOD');
  } catch (error) {
    console.error('write err:', error);
    throw error; 
  }
};


const fetchAndStoreData = async () => {
  try {
    const addresses = await getAddressesFromDatabase();
    for (const address of addresses) {
      const coordinates = await fetchCoordinatesForAddress(address.adr);

    // write
      const toPass = {flat_id:address.id, latitude: coordinates[0], longitude: coordinates[1]}
      console.log(toPass)
      await pushCoordinatesOnceModel(toPass); 
    }
    console.log('write ok');
  } catch (error) {
    console.error('err:', error);
  }
};


fetchAndStoreData();