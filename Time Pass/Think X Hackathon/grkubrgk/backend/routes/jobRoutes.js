const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { auth } = require('../middleware/auth');
const { validateJob } = require('../middleware/validation');

// Public routes
router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJob);

// Protected routes
router.post('/', auth, validateJob, jobController.createJob);
router.put('/:id', auth, jobController.updateJob);
router.delete('/:id', auth, jobController.deleteJob);
router.post('/:id/apply', auth, jobController.applyForJob);
router.get('/my/applications', auth, jobController.getMyApplications);
router.get('/my/posted', auth, jobController.getMyPostedJobs);
router.put('/:jobId/applications/:applicationId/status', auth, jobController.updateApplicationStatus);

module.exports = router;