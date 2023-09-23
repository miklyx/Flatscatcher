'use strict';

const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');

const router = require('./router.js');

app.use(bodyParser());
app.use(router.routes());

const port = 3003;

app.listen(port,'0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});
