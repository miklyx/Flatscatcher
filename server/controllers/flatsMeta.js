'use strict';

const flats = require('../models/flats.js');

exports.post = async ctx => {
  try {
    await flats.set(ctx.request.body);
    ctx.status = 200;
  } catch (e) {
    ctx.status = 500;
    // Further handle your error on the back-end
  }
};