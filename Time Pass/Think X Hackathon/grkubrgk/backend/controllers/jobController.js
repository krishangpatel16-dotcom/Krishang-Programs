const Job = require('../models/Job');
const User = require('../models/User');

// Create job posting
exports.createJob = async (req, res) => {
  try {
    const jobData = {
      ...req.body,
      postedBy: req.user.id
    };

    const job = new Job(jobData);
    await job.save();

    res.status(201).json({
      success: true,
      message: 'Job posted successfully',
      data: job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to post job',
      error: error.message
    });
  }
};

// Get all jobs (with filters)
exports.getAllJobs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search = '',
      employmentType,
      experienceLevel,
      location,
      company,
      isActive = true
    } = req.query;

    const query = { isActive };

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Filtering
    if (employmentType) {
      query.employmentType = employmentType;
    }

    if (experienceLevel) {
      query.experienceLevel = experienceLevel;
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (company) {
      query.company = { $regex: company, $options: 'i' };
    }

    // Pagination
    const jobs = await Job.find(query)
      .populate('postedBy', 'firstName lastName email profilePicture')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
            .limit(parseInt(limit));

    const total = await Job.countDocuments(query);

    res.json({
      success: true,
      data: jobs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch jobs',
      error: error.message
    });
  }
};

// Get single job
exports.getJob = async (req, res) => {
  try {
    const { id } = req.params;
    
    const job = await Job.findById(id)
      .populate('postedBy', 'firstName lastName email profilePicture currentCompany currentPosition')
      .populate('applications.applicant', 'firstName lastName email profilePicture');

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Increment view count
    job.views += 1;
    await job.save();

    // Check if user has already applied
    let hasApplied = false;
    if (req.user) {
      hasApplied = job.applications.some(app => 
        app.applicant && app.applicant._id.toString() === req.user.id
      );
    }

    res.json({
      success: true,
      data: {
        ...job.toObject(),
        hasApplied
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch job',
      error: error.message
    });
  }
};

// Update job
exports.updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    
    const job = await Job.findById(id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Check if user is the job poster
    if (job.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this job'
      });
    }

    const updates = req.body;
    Object.keys(updates).forEach(key => {
      job[key] = updates[key];
    });

    await job.save();

    res.json({
      success: true,
      message: 'Job updated successfully',
      data: job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update job',
      error: error.message
    });
  }
};

// Delete job
exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    
    const job = await Job.findById(id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Check if user is the job poster or admin
    if (job.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this job'
      });
    }

    await job.deleteOne();

    res.json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete job',
      error: error.message
    });
  }
};

// Apply for job
exports.applyForJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { coverLetter } = req.body;
    
    const job = await Job.findById(id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Check if job is active
    if (!job.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Job is no longer accepting applications'
      });
    }

    // Check if application deadline has passed
    if (job.applicationDeadline && new Date(job.applicationDeadline) < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Application deadline has passed'
      });
    }

    // Check if user has already applied
    const hasApplied = job.applications.some(app => 
      app.applicant && app.applicant.toString() === req.user.id
    );

    if (hasApplied) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this job'
      });
    }

    // Add application
    job.applications.push({
      applicant: req.user.id,
      coverLetter,
      status: 'pending'
    });

    await job.save();

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to apply for job',
      error: error.message
    });
  }
};

// Get user's job applications
exports.getMyApplications = async (req, res) => {
  try {
    const jobs = await Job.find({
      'applications.applicant': req.user.id
    })
    .populate('postedBy', 'company')
    .select('title company location employmentType createdAt applications')
    .sort({ 'applications.appliedAt': -1 });

    const applications = jobs.map(job => {
      const application = job.applications.find(app => 
        app.applicant.toString() === req.user.id
      );
      return {
        job: {
          id: job._id,
          title: job.title,
          company: job.company,
          location: job.location,
          employmentType: job.employmentType,
          postedBy: job.postedBy
        },
        appliedAt: application.appliedAt,
        status: application.status,
        coverLetter: application.coverLetter
      };
    });

    res.json({
      success: true,
      data: applications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications',
      error: error.message
    });
  }
};

// Get jobs posted by user
exports.getMyPostedJobs = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const jobs = await Job.find({ postedBy: req.user.id })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Job.countDocuments({ postedBy: req.user.id });

    res.json({
      success: true,
      data: jobs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch posted jobs',
      error: error.message
    });
  }
};

// Update application status (for job poster/admin)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { jobId, applicationId } = req.params;
    const { status } = req.body;
    
    const job = await Job.findById(jobId);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Check if user is authorized
    if (job.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update application status'
      });
    }

    const application = job.applications.id(applicationId);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    application.status = status;
    await job.save();

    res.json({
      success: true,
      message: 'Application status updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update application status',
      error: error.message
    });
  }
};