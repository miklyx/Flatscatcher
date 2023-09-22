'use strict';

const profile = require('../models/profile');

exports.getProfile = async ctx => {
  try {
    const userId = ctx.query.user_id
    ctx.body = await profile.getProfile({ user_id: userId});
  } catch (e) {
    ctx.status = 500;
    // Further handle your error on the back-end
  }
}

exports.updateProfile = async ctx => {
  try {
    //console.log(ctx.request.body)
    await profile.updateProfile(ctx.request.body);
    ctx.status = 200;
  } catch (e) {
    ctx.status = 500;
    // Further handle your error on the back-end
  }
}