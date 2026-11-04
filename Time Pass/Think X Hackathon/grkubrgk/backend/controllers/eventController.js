const Event = require('../models/Event');
const User = require('../models/User');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Create event
exports.createEvent = async (req, res) => {
  try {
    const eventData = {
      ...req.body,
      organizer: req.user.id
    };

    const event = new Event(eventData);
    await event.save();

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create event',
      error: error.message
    });
  }
};

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      eventType, 
      isVirtual, 
      upcomingOnly = true,
      search = ''
    } = req.query;

    const query = {};

    // Filter by event type
    if (eventType) {
      query.eventType = eventType;
    }

    // Filter by virtual/offline
    if (isVirtual !== undefined) {
      query.isVirtual = isVirtual === 'true';
    }

    // Filter upcoming events only
    if (upcomingOnly === 'true') {
      query.date = { $gte: new Date() };
    }

    // Search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    const events = await Event.find(query)
      .populate('organizer', 'firstName lastName email profilePicture')
      .sort({ date: 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    // Check if user is registered for each event
    const eventsWithRegistrationStatus = events.map(event => {
      const isRegistered = event.registeredAttendees.some(attendee => 
        attendee.user && attendee.user.toString() === req.user?.id
      );
      return {
        ...event.toObject(),
        isRegistered,
        registeredCount: event.registeredAttendees.length
      };
    });

    const total = await Event.countDocuments(query);

    res.json({
      success: true,
      data: eventsWithRegistrationStatus,
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
      message: 'Failed to fetch events',
      error: error.message
    });
  }
};

// Get single event
exports.getEvent = async (req, res) => {
  try {
    const { id } = req.params;
    
    const event = await Event.findById(id)
      .populate('organizer', 'firstName lastName email profilePicture currentCompany currentPosition')
      .populate('registeredAttendees.user', 'firstName lastName email profilePicture currentCompany');

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Check if user is registered
    const isRegistered = event.registeredAttendees.some(attendee => 
      attendee.user && attendee.user._id.toString() === req.user?.id
    );

    res.json({
      success: true,
      data: {
        ...event.toObject(),
        isRegistered,
        availableSpots: event.maxAttendees 
          ? event.maxAttendees - event.registeredAttendees.length 
          : null
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch event',
      error: error.message
    });
  }
};

// Update event
exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    
    const event = await Event.findById(id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Check if user is the organizer or admin
    if (event.organizer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this event'
      });
    }

    const updates = req.body;
    Object.keys(updates).forEach(key => {
      event[key] = updates[key];
    });

    await event.save();

    res.json({
      success: true,
      message: 'Event updated successfully',
      data: event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update event',
      error: error.message
    });
  }
};

// Delete event
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    
    const event = await Event.findById(id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Check if user is the organizer or admin
    if (event.organizer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this event'
      });
    }

    await event.deleteOne();

    res.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete event',
      error: error.message
    });
  }
};

// Register for event
exports.registerForEvent = async (req, res) => {
  try {
    const { id } = req.params;
    
    const event = await Event.findById(id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Check if registration deadline has passed
    if (event.registrationDeadline && new Date(event.registrationDeadline) < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Registration deadline has passed'
      });
    }

    // Check if event is at capacity
    if (event.maxAttendees && event.registeredAttendees.length >= event.maxAttendees) {
      return res.status(400).json({
        success: false,
        message: 'Event is at full capacity'
      });
    }

    // Check if already registered
    const isRegistered = event.registeredAttendees.some(attendee => 
      attendee.user && attendee.user.toString() === req.user.id
    );

    if (isRegistered) {
      return res.status(400).json({
        success: false,
        message: 'Already registered for this event'
      });
    }

    // Register user
    event.registeredAttendees.push({
      user: req.user.id,
      status: 'registered'
    });

    await event.save();

    // Send confirmation email
    await sendEventRegistrationConfirmation(event, req.user);

    res.status(201).json({
      success: true,
      message: 'Successfully registered for event'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to register for event',
      error: error.message
    });
  }
};

// Helper function to send registration confirmation
const sendEventRegistrationConfirmation = async (event, user) => {
  try {
    await transporter.sendMail({
      from: `"Alumni Connect - Events" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: `Registration Confirmation: ${event.title}`,
      html: `
        <h2>Event Registration Confirmed!</h2>
        <p>Dear ${user.firstName} ${user.lastName},</p>
        <p>You have successfully registered for the following event:</p>
        <h3>${event.title}</h3>
        <p><strong>Date:</strong> ${event.date.toLocaleString()}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        ${event.isVirtual && event.meetingLink ? 
          `<p><strong>Meeting Link:</strong> <a href="${event.meetingLink}">${event.meetingLink}</a></p>` : ''}
        ${event.venue ? `<p><strong>Venue:</strong> ${event.venue}</p>` : ''}
        <p>We look forward to seeing you there!</p>
        <p>Best regards,<br>Alumni Connect Team</p>
      `
    });
  } catch (error) {
    console.error('Failed to send registration confirmation:', error);
  }
};

// Cancel registration
exports.cancelRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    
    const event = await Event.findById(id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Find and update registration
    const registrationIndex = event.registeredAttendees.findIndex(attendee => 
      attendee.user && attendee.user.toString() === req.user.id
    );

    if (registrationIndex === -1) {
      return res.status(400).json({
        success: false,
        message: 'Not registered for this event'
      });
    }

    event.registeredAttendees[registrationIndex].status = 'cancelled';
    await event.save();

    res.json({
      success: true,
      message: 'Registration cancelled successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to cancel registration',
      error: error.message
    });
  }
};

// Get user's registered events
exports.getMyEvents = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const events = await Event.find({
      'registeredAttendees.user': req.user.id,
      'registeredAttendees.status': 'registered'
    })
    .populate('organizer', 'firstName lastName')
    .sort({ date: 1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

    const total = await Event.countDocuments({
      'registeredAttendees.user': req.user.id,
      'registeredAttendees.status': 'registered'
    });

    res.json({
      success: true,
      data: events,
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
      message: 'Failed to fetch registered events',
      error: error.message
    });
  }
};

// Get events created by user
exports.getMyCreatedEvents = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const events = await Event.find({ organizer: req.user.id })
      .sort({ date: 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Event.countDocuments({ organizer: req.user.id });

    res.json({
      success: true,
      data: events,
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
      message: 'Failed to fetch created events',
      error: error.message
    });
  }
};

// Get upcoming events
exports.getUpcomingEvents = async (req, res) => {
  try {
    const events = await Event.find({
      date: { $gte: new Date() }
    })
    .populate('organizer', 'firstName lastName profilePicture')
    .sort({ date: 1 })
    .limit(6);

    res.json({
      success: true,
      data: events
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch upcoming events',
      error: error.message
    });
  }
};