'use strict';

const Router = require('koa-router');
const router = new Router();

const flats = require('./controllers/flats.js');
const flatsMeta = require('./controllers/flatsMeta.js');


router.get('/flats', flats.getAll);
router.get('/stats', flats.getStats);
router.post('/updatemeta', flats.updateMeta);

router.get('/profile', flats.getProfile);
router.get('/profileMeta', flats.getProfileMeta);
//router.post('/flatsmeta', flatsMeta.post);

module.exports = router;