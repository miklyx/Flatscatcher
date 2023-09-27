'use strict';

const Router = require('koa-router');
const router = new Router();

const flats = require('./controllers/flats.js');
const flatsMeta = require('./controllers/flatsMeta.js');
const profile = require('./controllers/profile.js');
const profileMeta = require('./controllers/profileMeta.js');



router.get('/flats', flats.getAll);   //get all flats
router.get('/stats', flatsMeta.getStats);   //get user's statistics


router.post('/login', flatsMeta.updateLoginMeta);  //also reloads metadata - new, applied to agg table 
router.post('/logout', flatsMeta.updateLogoutMeta); // update when logout - set applied and preferred


router.get('/profile', profile.getProfile);  //get basic profile data
router.get('/profileMeta', profileMeta.getProfileMeta);    //get data from profila preferences

router.post('/profile', profile.updateProfile);  // update profile basic data in db

router.post('/profileMeta', profileMeta.updateProfileMeta); // update profile preferences data and update metadata about flats - preferred


router.post('/apply', profileMeta.apply);  // set flat as applied

router.post('/coordinates', profileMeta.pushCoordinates); //this is experimental - see /service/getCoordinates.js


module.exports = router;