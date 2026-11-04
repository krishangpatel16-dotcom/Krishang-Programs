const User = require('../models/User');
const AlumniProfile = require('../models/AlumniProfile');

// Get all alumni (with pagination and filtering)
exports.getAllAlumni = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search = '',
      graduationYear,
      department,
      industry,
      location,
      availableForMentorship
    } = req.query;

    const query = {};
    const profileQuery = {};

    // Build user query
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    if (graduationYear) {
      query.graduationYear = graduationYear;
    }

    if (department) {
      query.department = department;
    }

    if (location) {
      query.currentCity = { $regex: location, $options: 'i' };
    }

    // Build profile query
    if (industry) {
      profileQuery.industry = { $regex: industry, $options: 'i' };
    }

    if (availableForMentorship === 'true') {
      profileQuery.availableForMentorship = true;
    }

    // Get alumni profiles with populated user data
    const alumni = await AlumniProfile.find(profileQuery)
      .populate({
        path: 'user',
        match: query,
        select: '-password -tokens'
      })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ 'user.lastName': 1 });

    // Filter out profiles without user (due to match)
    const filteredAlumni = alumni.filter(item => item.user !== null);

    // Get total count
    const total = await AlumniProfile.countDocuments(profileQuery);

    res.json({
      success: true,
      data: filteredAlumni,
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
      message: 'Failed to fetch alumni',
      error: error.message
    });
  }
};

// Get single alumni profile
exports.getAlumniProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const profile = await AlumniProfile.findOne({ user: id })
      .populate('user', '-password -tokens');

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Alumni profile not found'
      });
    }

    // Increment view count if not the profile owner
    if (req.user.id !== id) {
      // You can add view tracking logic here
    }

    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch alumni profile',
      error: error.message
    });
  }
};

// Update alumni profile
exports.updateAlumniProfile = async (req, res) => {
  try {
    const updates = req.body;
    const profile = await AlumniProfile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    // Update profile fields
    Object.keys(updates).forEach(key => {
      if (key in profile.schema.paths) {
        profile[key] = updates[key];
      }
    });

    profile.lastUpdated = new Date();
    await profile.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message
    });
  }
};

// Get alumni stats
exports.getAlumniStats = async (req, res) => {
  try {
    // Total alumni count
    const totalAlumni = await User.countDocuments({ role: 'alumni' });

    // Alumni by department
    const alumniByDept = await User.aggregate([
      { $match: { role: 'alumni' } },
      { $group: { _id: '$department', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Alumni by graduation year
    const alumniByYear = await User.aggregate([
      { $match: { role: 'alumni' } },
      { $group: { _id: '$graduationYear', count: { $sum: 1 } } },
      { $sort: { _id: -1 } }
    ]);

    // Alumni by location
    const alumniByLocation = await User.aggregate([
      { $match: { role: 'alumni', currentCity: { $exists: true, $ne: '' } } },
      { $group: { _id: '$currentCity', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // Mentors count
    const mentorsCount = await AlumniProfile.countDocuments({
      availableForMentorship: true
    });

    res.json({
      success: true,
      data: {
        totalAlumni,
        alumniByDept,
        alumniByYear,
        alumniByLocation,
        mentorsCount
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch alumni stats',
      error: error.message
    });
  }
};

// Search alumni
exports.searchAlumni = async (req, res) => {
  try {
    const { q, field } = req.query;

    let query = {};

    if (field === 'skills') {
      query = { skills: { $regex: q, $options: 'i' } };
    } else if (field === 'industry') {
      query = { industry: { $regex: q, $options: 'i' } };
    } else {
      query = {
        $or: [
          { 'user.firstName': { $regex: q, $options: 'i' } },
          { 'user.lastName': { $regex: q, $options: 'i' } },
          { 'user.currentCity': { $regex: q, $options: 'i' } },
          { currentCompany: { $regex: q, $options: 'i' } },
          { currentPosition: { $regex: q, $options: 'i' } }
        ]
      };
    }

    const profiles = await AlumniProfile.find(query)
      .populate('user', 'firstName lastName email graduationYear department profilePicture')
      .limit(50);

    res.json({
      success: true,
      data: profiles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Search failed',
      error: error.message
    });
  }
};

// Connect with alumni (send connection request)
exports.sendConnectionRequest = async (req, res) => {
  try {
    const { alumniId } = req.params;
    const { message } = req.body;

    // Check if alumni exists
    const alumni = await User.findById(alumniId);
    if (!alumni) {
      return res.status(404).json({
        success: false,
        message: 'Alumni not found'
      });
    }

    // Check if not trying to connect with self
    if (alumniId === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'Cannot send connection request to yourself'
      });
    }

    // TODO: Implement connection request logic
    // This could involve creating a ConnectionRequest model
    // with fields: requester, recipient, message, status, createdAt

    res.json({
      success: true,
      message: 'Connection request sent successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to send connection request',
      error: error.message
    });
  }
};