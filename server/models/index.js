const { Pool } = require('pg');

const pool = new Pool({
  user: 'flathunter',
  host: 'localhost',
  database: 'flathunter',
  password: 'flathunter',
  port: 5432
});

module.exports = pool;

