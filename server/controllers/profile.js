'use strict';

const profile = require('../models/profile');

exports.getProfile = async ctx => {
  try {
    const userId = ctx.query.user_id;
    ctx.body = await profile.getProfile({ user_id: userId});
  } catch (e) {
    ctx.status = 500;
  }
};

exports.updateProfile = async ctx => {
  try {
    await profile.updateProfile(ctx.request.body);
    ctx.status = 200;
  } catch (e) {
    ctx.status = 500;
  }
};