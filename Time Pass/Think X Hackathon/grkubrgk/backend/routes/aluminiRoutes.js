const express = require('express');
const router = express.Router();
const alumniController = require('../controllers/alumniController');
const { auth } = require('../middleware/auth');
const { adminAuth } = require('../middleware/auth');

// Public routes (with limited data)
router.get('/', alumniController.getAllAlumni);
router.get('/stats', alumniController.getAlumniStats);
router.get('/search', alumniController.searchAlumni);

// Protected routes
router.get('/profile/:id', auth, alumniController.getAlumniProfile);
router.put('/profile', auth, alumniController.updateAlumniProfile);
router.post('/connect/:alumniId', auth, alumniController.sendConnectionRequest);

// Admin only routes
router.get('/admin/stats', auth, adminAuth, alumniController.getAlumniStats);

module.exports = router;