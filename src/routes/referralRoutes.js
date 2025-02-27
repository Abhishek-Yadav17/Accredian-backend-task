const express = require('express');
const { saveReferral } = require('../controllers/referralController');

const router = express.Router();

router.post('/referrals', saveReferral);

module.exports = router;
