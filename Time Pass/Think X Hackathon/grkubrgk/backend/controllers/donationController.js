const Donation = require('../models/Donation');
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Create donation
exports.createDonation = async (req, res) => {
  try {
    const donationData = {
      ...req.body,
      donor: req.user.id,
      transactionId: `DON-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };

    const donation = new Donation(donationData);
    await donation.save();

    // In a real application, integrate with payment gateway here
    // For demo, we'll simulate successful payment
    donation.status = 'completed';
    donation.completedAt = new Date();
    await donation.save();

    // Send donation receipt
    await sendDonationReceipt(donation);

    res.status(201).json({
      success: true,
      message: 'Donation processed successfully',
      data: donation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to process donation',
      error: error.message
    });
  }
};

// Helper function to send donation receipt
const sendDonationReceipt = async (donation) => {
  try {
    const donor = await User.findById(donation.donor);
    
    await transporter.sendMail({
      from: `"Alumni Connect - Donations" <${process.env.SMTP_USER}>`,
      to: donor.email,
      subject: 'Donation Receipt - Thank You for Your Contribution',
      html: `
        <h2>Thank You for Your Donation!</h2>
        <p>Dear ${donor.firstName} ${donor.lastName},</p>
        <p>Thank you for your generous donation to Government Engineering College.</p>
        <h3>Donation Details:</h3>
        <ul>
          <li>Amount: $${donation.amount} ${donation.currency}</li>
          <li>Purpose: ${donation.purpose}</li>
          <li>Transaction ID: ${donation.transactionId}</li>
          <li>Date: ${donation.completedAt.toLocaleDateString()}</li>
        </ul>
        <p>Your contribution will help support various initiatives and projects.</p>
        <p>Best regards,<br>Alumni Connect Team</p>
      `
    });

    donation.receiptSent = true;
    donation.receiptEmail = donor.email;
    await donation.save();
  } catch (error) {
    console.error('Failed to send donation receipt:', error);
  }
};

// Get all donations (admin only)
exports.getAllDonations = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      startDate, 
      endDate, 
      purpose, 
      status 
    } = req.query;

    const query = {};

    // Date filtering
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        query.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        query.createdAt.$lte = new Date(endDate);
      }
    }

    if (purpose) {
      query.purpose = purpose;
    }

    if (status) {
      query.status = status;
    }

    const donations = await Donation.find(query)
      .populate('donor', 'firstName lastName email profilePicture')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Donation.countDocuments(query);
    const totalAmount = await Donation.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    res.json({
      success: true,
      data: donations,
      summary: {
        totalAmount: totalAmount[0]?.total || 0,
        totalDonations: total
      },
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
      message: 'Failed to fetch donations',
      error: error.message
    });
  }
};

// Get user's donations
exports.getMyDonations = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const donations = await Donation.find({ donor: req.user.id })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Donation.countDocuments({ donor: req.user.id });
    const totalAmount = await Donation.aggregate([
      { $match: { donor: req.user._id, status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    res.json({
      success: true,
      data: donations,
      summary: {
        totalDonations: total,
        totalAmount: totalAmount[0]?.total || 0
      },
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
      message: 'Failed to fetch donations',
      error: error.message
    });
  }
};

// Get donation stats
exports.getDonationStats = async (req, res) => {
  try {
    // Monthly donations
    const monthlyDonations = await Donation.aggregate([
      {
        $match: {
          status: 'completed',
          createdAt: {
            $gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1))
          }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Donations by purpose
    const donationsByPurpose = await Donation.aggregate([
      { $match: { status: 'completed' } },
      {
        $group: {
          _id: '$purpose',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { total: -1 } }
    ]);

    // Top donors
    const topDonors = await Donation.aggregate([
      { $match: { status: 'completed' } },
      {
        $group: {
          _id: '$donor',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { total: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'donorInfo'
        }
      },
      { $unwind: '$donorInfo' },
      {
        $project: {
          donor: {
            id: '$_id',
            name: { $concat: ['$donorInfo.firstName', ' ', '$donorInfo.lastName'] },
            email: '$donorInfo.email'
          },
          total: 1,
          count: 1
        }
      }
    ]);

    // Recent donations
    const recentDonations = await Donation.find({ status: 'completed' })
      .populate('donor', 'firstName lastName profilePicture')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: {
        monthlyDonations,
        donationsByPurpose,
        topDonors,
        recentDonations
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch donation stats',
      error: error.message
    });
  }
};

// Get single donation
exports.getDonation = async (req, res) => {
  try {
    const { id } = req.params;
    
    const donation = await Donation.findById(id)
      .populate('donor', 'firstName lastName email');

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }

    // Check if user is authorized to view
    if (donation.donor._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this donation'
      });
    }

    res.json({
      success: true,
      data: donation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch donation',
      error: error.message
    });
  }
};

// Resend donation receipt
exports.resendReceipt = async (req, res) => {
  try {
    const { id } = req.params;
    
    const donation = await Donation.findById(id);
    
    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }

    // Check if user is authorized
    if (donation.donor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    await sendDonationReceipt(donation);

    res.json({
      success: true,
      message: 'Receipt sent successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to resend receipt',
      error: error.message
    });
  }
};