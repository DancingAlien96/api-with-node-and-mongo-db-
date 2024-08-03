const express = require('express');
const router = express.Router();
const{ getTracks, createTracks, updateTrack, getTrack, deleteTrack} = require('../controllers/tracks');
const {ValidatorFieldsTracks, ValidatorGetTrack} = require('../validators/tracks');
const {authMiddleWare} = require('../middleware/session');
const {checkRole} = require('../middleware/checkRole');


router.get('/',authMiddleWare, getTracks);
router.post('/', ValidatorFieldsTracks, authMiddleWare, checkRole(["admin"]) ,createTracks);
router.put('/:id',ValidatorGetTrack, ValidatorFieldsTracks, authMiddleWare, updateTrack );
router.get('/:id', ValidatorGetTrack, authMiddleWare, getTrack );
router.delete('/:id', ValidatorGetTrack, authMiddleWare, deleteTrack);
module.exports = router
