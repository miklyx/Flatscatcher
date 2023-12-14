'use strict';

const flats = require('../models/flats.js');

exports.getAll = async ctx => {
  try {
    ctx.body = await flats.getAll();
  } catch (e) {
    ctx.status = 500;
    console.log(e)
  }
};


exports.getAll24 = async ctx => {
  try {
    ctx.body = await flats.getAll24();
  } catch (e) {
    ctx.status = 500;
    console.log(e)
  }
};

exports.getAllSorted24 = async ctx => {
  try {
    ctx.body = await flats.getAllSorted24();
  } catch (e) {
    ctx.status = 500;
    console.log(e)
  }
};
