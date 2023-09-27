'use strict';

const flats = require('../models/flats.js');

exports.getAll = async ctx => {
  try {
    ctx.body = await flats.getAll();
  } catch (e) {
    ctx.status = 500;
  }
};
