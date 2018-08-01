const express = require('express');
const router = express.Router();
const userCtrl = require('../Controllers/user.ctrl');

router.post('/Register', userCtrl.register);
router.post('/login', userCtrl.login);


module.exports = router;
