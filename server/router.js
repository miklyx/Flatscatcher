'use strict';

const Router = require('koa-router');
const router = new Router();

const flats = require('./controllers/flats.js');
const flatsMeta = require('./controllers/flatsMeta.js');
const profile = require('./controllers/profile.js');
const profileMeta = require('./controllers/profileMeta.js');



router.get('/flats', flats.getAll);
router.get('/stats', flatsMeta.getStats);
router.post('/updatemeta', flatsMeta.updateMeta);

router.get('/profile', profile.getProfile);
router.get('/profileMeta', profileMeta.getProfileMeta);
//router.post('/flatsmeta', flatsMeta.post);

module.exports = router;