'use strict';

const profileMeta = require('../models/profileMeta');

exports.getProfileMeta = async ctx => {
  try {
    ctx.body = await profileMeta.getProfileMeta(ctx.request.body);
  } catch (e) {
    ctx.status = 500;
  }
};

exports.updateProfileMeta = async ctx => {
  try {
    await profileMeta.updatePreferences(ctx.request.body);
    ctx.status = 200;
  } catch (e) {
    ctx.status = 500;
  }
};

exports.apply = async ctx => {
  try {
    await profileMeta.apply(ctx.request.body);
    ctx.status = 200;
  } catch (e) {
    ctx.status = 500;
  }
};