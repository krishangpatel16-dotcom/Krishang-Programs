const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');
const { auth } = require('../middleware/auth');
const { adminAuth } = require('../middleware/auth');
const { validateDonation } = require('../middleware/validation');

// Protected routes
router.post('/', auth, validateDonation, donationController.createDonation);
router.get('/my', auth, donationController.getMyDonations);
router.get('/stats', auth, donationController.getDonationStats);
router.get('/:id', auth, donationController.getDonation);
router.post('/:id/resend-receipt', auth, donationController.resendReceipt);

// Admin only routes
router.get('/', auth, adminAuth, donationController.getAllDonations);

module.exports = router;