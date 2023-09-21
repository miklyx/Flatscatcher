'use strict';

const flatsMeta = require('../models/flatsMeta');

exports.getStats = async ctx => {
  try {
    ctx.body = await flatsMeta.getStats(ctx.request.body);
  } catch (e) {
    ctx.status = 500;
    // Further handle your error on the back-end
  }
};

exports.updateLoginMeta = async ctx => {
  try {
    //console.log(ctx.request.body)
    ctx.body = await flatsMeta.updataLoginMeta(ctx.request.body);
  } catch (e) {
    ctx.status = 500;
  }
}

exports.updateLogoutMeta = async ctx => {
  try {
    ctx.body = await flatsMeta.updateLogoutMeta(ctx.request.body);
  } catch (e) {
    ctx.status = 500;
  }
}



exports 
//SOMETHING WEIRG FOR A WHILE
/* 
exports.post = async ctx => {
  try {
    await flatsMeta.set(ctx.request.body);
    ctx.status = 200;
  } catch (e) {
    ctx.status = 500;
    // Further handle your error on the back-end
  }
}; */