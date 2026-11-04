const express = require('express');
const router = express.Router();
const storyController = require('../controllers/storyController');
const { auth } = require('../middleware/auth');

// Public routes
router.get('/', storyController.getAllStories);
router.get('/featured', storyController.getFeaturedStories);
router.get('/:id', storyController.getStory);

// Protected routes
router.post('/', auth, storyController.createStory);
router.put('/:id', auth, storyController.updateStory);
router.delete('/:id', auth, storyController.deleteStory);
router.post('/:id/like', auth, storyController.toggleLike);
router.post('/:id/comments', auth, storyController.addComment);
router.post('/:id/comments/:commentId/reply', auth, storyController.replyToComment);
router.get('/my/stories', auth, storyController.getMyStories);

module.exports = router;