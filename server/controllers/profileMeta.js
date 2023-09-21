'use strict';

const profileMeta = require('../models/profileMeta');

exports.getProfileMeta = async ctx => {
  try {
    ctx.body = await profileMeta.getProfileMeta();
  } catch (e) {
    ctx.status = 500;
    // Further handle your error on the back-end
  }
}