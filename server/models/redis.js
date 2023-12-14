const dotenv = require('dotenv');
const { createClient } = require('redis');

dotenv.config({path:'../.env'})

const client = createClient({
  password: process.env.REDIS_PWD,
  socket: {
      host: process.env.REDIS_HOST,
      port: 15432
  }
})
    .on('error', err => console.log('Redis Client Error', err))
    .connect();

module.exports = client;

