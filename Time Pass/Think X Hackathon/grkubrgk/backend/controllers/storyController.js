const Story = require('../models/Story');
const User = require('../models/User');

// Create story
exports.createStory = async (req, res) => {
  try {
    const storyData = {
      ...req.body,
      author: req.user.id
    };

    // If story is published, set published date
    if (storyData.isPublished) {
      storyData.publishedAt = new Date();
    }

    const story = new Story(storyData);
    await story.save();

    res.status(201).json({
      success: true,
      message: 'Story created successfully',
      data: story
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create story',
      error: error.message
    });
  }
};

// Get all stories
exports.getAllStories = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      category, 
      author, 
      featured,
      search = '',
      publishedOnly = true
    } = req.query;

    const query = {};

    // Filter by publication status
    if (publishedOnly === 'true') {
      query.isPublished = true;
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by author
    if (author) {
      query.author = author;
    }

    // Filter featured stories
    if (featured === 'true') {
      query.isFeatured = true;
    }

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    const stories = await Story.find(query)
      .populate('author', 'firstName lastName email profilePicture currentCompany currentPosition')
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Story.countDocuments(query);

    res.json({
      success: true,
      data: stories,
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
      message: 'Failed to fetch stories',
      error: error.message
    });
  }
};

// Get single story
exports.getStory = async (req, res) => {
  try {
    const { id } = req.params;
    
    const story = await Story.findById(id)
      .populate('author', 'firstName lastName email profilePicture currentCompany currentPosition')
      .populate('comments.user', 'firstName lastName profilePicture')
      .populate('comments.replies.user', 'firstName lastName profilePicture');

    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Story not found'
      });
    }

    // Increment view count
    story.views += 1;
    await story.save();

    // Check if user has liked the story
    let hasLiked = false;
    if (req.user) {
      hasLiked = story.likes.some(like => 
        like.user && like.user.toString() === req.user.id
      );
    }

    res.json({
      success: true,
      data: {
        ...story.toObject(),
        hasLiked
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch story',
      error: error.message
    });
  }
};

// Update story
exports.updateStory = async (req, res) => {
  try {
    const { id } = req.params;
    
    const story = await Story.findById(id);
    
    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Story not found'
      });
    }

    // Check if user is the author or admin
    if (story.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this story'
      });
    }

    const updates = req.body;
    
    // If publishing the story for the first time
    if (updates.isPublished && !story.isPublished) {
      updates.publishedAt = new Date();
    }

    Object.keys(updates).forEach(key => {
      story[key] = updates[key];
    });

    await story.save();

    res.json({
      success: true,
      message: 'Story updated successfully',
      data: story
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update story',
      error: error.message
    });
  }
};

// Delete story
exports.deleteStory = async (req, res) => {
  try {
    const { id } = req.params;
    
    const story = await Story.findById(id);
    
    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Story not found'
      });
    }

    // Check if user is the author or admin
    if (story.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this story'
      });
    }

    await story.deleteOne();

    res.json({
      success: true,
      message: 'Story deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete story',
      error: error.message
    });
  }
};

// Like/unlike story
exports.toggleLike = async (req, res) => {
  try {
    const { id } = req.params;
    
    const story = await Story.findById(id);
    
    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Story not found'
      });
    }

    // Check if user has already liked
    const likeIndex = story.likes.findIndex(like => 
      like.user && like.user.toString() === req.user.id
    );

    if (likeIndex > -1) {
      // Unlike
      story.likes.splice(likeIndex, 1);
      await story.save();
      
      return res.json({
        success: true,
        message: 'Story unliked',
        liked: false,
        likesCount: story.likes.length
      });
    } else {
      // Like
      story.likes.push({
        user: req.user.id
      });
      await story.save();
      
      return res.json({
        success: true,
        message: 'Story liked',
        liked: true,
        likesCount: story.likes.length
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to toggle like',
      error: error.message
    });
  }
};

// Add comment
exports.addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    
    const story = await Story.findById(id);
    
    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Story not found'
      });
    }

    story.comments.push({
      user: req.user.id,
      comment
    });

    await story.save();

    // Populate the new comment with user info
    const populatedStory = await Story.findById(id)
      .populate('comments.user', 'firstName lastName profilePicture');

    const newComment = populatedStory.comments[populatedStory.comments.length - 1];

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      data: newComment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to add comment',
      error: error.message
    });
  }
};

// Reply to comment
exports.replyToComment = async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const { reply } = req.body;
    
    const story = await Story.findById(id);
    
    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Story not found'
      });
    }

    const comment = story.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    comment.replies.push({
      user: req.user.id,
      reply
    });

    await story.save();

    res.status(201).json({
      success: true,
      message: 'Reply added successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to add reply',
      error: error.message
    });
  }
};

// Get featured stories
exports.getFeaturedStories = async (req, res) => {
  try {
    const stories = await Story.find({
      isPublished: true,
      isFeatured: true
    })
    .populate('author', 'firstName lastName profilePicture currentCompany currentPosition')
    .sort({ publishedAt: -1 })
    .limit(6);

    res.json({
      success: true,
      data: stories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured stories',
      error: error.message
    });
  }
};

// Get user's stories
exports.getMyStories = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const stories = await Story.find({ author: req.user.id })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Story.countDocuments({ author: req.user.id });

    res.json({
      success: true,
      data: stories,
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
      message: 'Failed to fetch user stories',
      error: error.message
    });
  }
};