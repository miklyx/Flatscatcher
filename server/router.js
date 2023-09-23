'use strict';

const Router = require('koa-router');
const router = new Router();

const flats = require('./controllers/flats.js');
const flatsMeta = require('./controllers/flatsMeta.js');
const profile = require('./controllers/profile.js');
const profileMeta = require('./controllers/profileMeta.js');



router.get('/flats', flats.getAll);   //ok
router.get('/stats', flatsMeta.getStats);  //ok 
router.post('/login', flatsMeta.updateLoginMeta);  //also reloads data  //ok
router.post('/logout', flatsMeta.updateLogoutMeta); // update when logout //ok


router.get('/profile', profile.getProfile);  //ok
router.get('/profileMeta', profileMeta.getProfileMeta);    //ok 
router.post('/profile', profile.updateProfile);  //ok

router.post('/profileMeta', profileMeta.updateProfileMeta);  // also matches user's meta  //ok
router.post('/apply', profileMeta.apply);


module.exports = router;