'use strict';

const flats = require('../models/flats.js');

exports.getAll = async ctx => {
  try {
    ctx.body = await flats.getAll();
  } catch (e) {
    ctx.status = 500;
    // Further handle your error on the back-end
  }
};


//MOVE TO FLATSMETA
/* exports.getStats = async ctx => {
  try {
    ctx.body = await flats.getStats();
  } catch (e) {
    ctx.status = 500;
    // Further handle your error on the back-end
  }
};

exports.updateMeta = async ctx => {
  try {
    ctx.body = await flats.updataMeta();
  } catch (e) {
    ctx.status = 500;
  }
} */


//MOVE TO PROFILE
/* exports.getProfile = async ctx => {
  try {
    ctx.body = await flats.getProfile();
  } catch (e) {
    ctx.status = 500;
    // Further handle your error on the back-end
  }
}
 */
//MOVE TO PROFILE META
/* exports.getProfileMeta = async ctx => {
  try {
    ctx.body = await flats.getProfileMeta();
  } catch (e) {
    ctx.status = 500;
    // Further handle your error on the back-end
  }
}
 */

//SOMETHING WEIRD FOR A WHILE

/* 
exports.post = async ctx => {
  try {
    await flats.set(ctx.request.body);
    ctx.status = 200;
  } catch (e) {
    ctx.status = 500;
    // Further handle your error on the back-end
  }
}; */