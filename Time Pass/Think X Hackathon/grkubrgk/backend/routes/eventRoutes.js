const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { auth } = require('../middleware/auth');
const { validateEvent } = require('../middleware/validation');

// Public routes
router.get('/', eventController.getAllEvents);
router.get('/upcoming', eventController.getUpcomingEvents);
router.get('/featured', eventController.getFeaturedStories); // Note: This should be getFeaturedEvents if you add that
router.get('/:id', eventController.getEvent);

// Protected routes
router.post('/', auth, validateEvent, eventController.createEvent);
router.put('/:id', auth, eventController.updateEvent);
router.delete('/:id', auth, eventController.deleteEvent);
router.post('/:id/register', auth, eventController.registerForEvent);
router.delete('/:id/register', auth, eventController.cancelRegistration);
router.get('/my/registered', auth, eventController.getMyEvents);
router.get('/my/created', auth, eventController.getMyCreatedEvents);

module.exports = router;