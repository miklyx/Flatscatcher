'use strict';
const dotenv = require('dotenv');
const Koa = require('koa');
const app = new Koa();
//const serve = require('koa-static');  -- do we really need it?
const bodyParser = require('koa-bodyparser');

const router = require('./router.js');

dotenv.config({path:'../.env'});

app.use(bodyParser());
app.use(router.routes());

const port = process.env.SERVER_PORT || "3003";
const host = process.env.SERVER_HOST;

app.listen(port,host, () => {  //  This is a host for server to be connected from any local network address
  console.log(`Server listening on port ${port}`);
});
