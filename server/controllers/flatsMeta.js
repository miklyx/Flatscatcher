'use strict';

const flatsMeta = require('../models/flatsMeta');

exports.getStats = async ctx => {
  try {
    ctx.body = await flatsMeta.getStats();
  } catch (e) {
    ctx.status = 500;
    // Further handle your error on the back-end
  }
};

exports.updateMeta = async ctx => {
  try {
    ctx.body = await flatsMeta.updataMeta();
  } catch (e) {
    ctx.status = 500;
  }
}
//SOMETHING WEIRG FOR A WHILE
exports.post = async ctx => {
  try {
    await flatsMeta.set(ctx.request.body);
    ctx.status = 200;
  } catch (e) {
    ctx.status = 500;
    // Further handle your error on the back-end
  }
};