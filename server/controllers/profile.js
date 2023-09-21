'use strict';

const profile = require('../models/profile');

exports.getProfile = async ctx => {
  try {
    ctx.body = await profile.getProfile();
  } catch (e) {
    ctx.status = 500;
    // Further handle your error on the back-end
  }
}