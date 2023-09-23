'use strict';

const flatsMeta = require('../models/flatsMeta');

exports.getStats = async ctx => {
  try {
    const userId = ctx.query.user_id;
    ctx.body = await flatsMeta.getStats({ user_id: userId});
  } catch (e) {
    ctx.status = 500;
  }
};

exports.updateLoginMeta = async ctx => {
  try {
    ctx.body = await flatsMeta.updataLoginMeta(ctx.request.body);
  } catch (e) {
    ctx.status = 500;
  }
};

exports.updateLogoutMeta = async ctx => {
  try {
    ctx.body = await flatsMeta.updateLogoutMeta(ctx.request.body);
  } catch (e) {
    ctx.status = 500;
  }
};
