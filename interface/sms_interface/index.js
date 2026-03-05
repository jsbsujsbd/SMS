const express = require('express');
const router = express.Router();
const smsController = require('../../control/sms/index');
router.get('/build_smscode', smsController.build_smscode);
router.post('/check_smscode', smsController.check_smscode);
module.exports = router;