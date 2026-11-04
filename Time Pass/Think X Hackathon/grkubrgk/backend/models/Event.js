const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  endDate: Date,
  location: {
    type: String,
    required: true
  },
  venue: String,
  eventType: {
    type: String,
    enum: ['reunion', 'workshop', 'seminar', 'networking', 'career_fair', 'webinar'],
    default: 'networking'
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  maxAttendees: Number,
  registeredAttendees: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    registeredAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['registered', 'attended', 'cancelled'],
      default: 'registered'
    }
  }],
  speakers: [{
    name: String,
    designation: String,
    company: String
  }],
  agenda: [{
    time: String,
    title: String,
    description: String,
    speaker: String
  }],
  coverImage: String,
  isVirtual: {
    type: Boolean,
    default: false
  },
  meetingLink: String,
  registrationDeadline: Date,
  registrationFee: {
    amount: Number,
    currency: {
      type: String,
      default: 'USD'
    }
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Event', eventSchema);