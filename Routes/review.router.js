const express = require('express');
const router = express.Router();
const ReviewCtrl = require('../Controllers/review.ctrl');

router.post('/Save', ReviewCtrl.save);
router.get('/Get/:id',ReviewCtrl.get);

module.exports = router; 

