const mongoose = require('mongoose');

const alumniProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  bio: {
    type: String,
    maxlength: 500
  },
  currentPosition: String,
  currentCompany: String,
  industry: String,
  skills: [String],
  workExperience: [{
    position: String,
    company: String,
    startDate: Date,
    endDate: Date,
    current: Boolean,
    description: String
  }],
  education: [{
    degree: String,
    institution: String,
    fieldOfStudy: String,
    startYear: Number,
    endYear: Number
  }],
  socialLinks: {
    linkedin: String,
    twitter: String,
    github: String,
    portfolio: String
  },
  interests: [String],
  availableForMentorship: {
    type: Boolean,
    default: false
  },
  mentorshipAreas: [String],
  visibility: {
    type: String,
    enum: ['public', 'alumni-only', 'private'],
    default: 'alumni-only'
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AlumniProfile', alumniProfileSchema);