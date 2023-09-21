'use strict';

const profile = require('../models/profile');

exports.getProfile = async ctx => {
  try {
    ctx.body = await profile.getProfile(ctx.request.body);
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