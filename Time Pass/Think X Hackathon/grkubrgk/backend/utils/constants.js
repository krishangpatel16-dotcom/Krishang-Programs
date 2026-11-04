// User roles
exports.USER_ROLES = {
  ALUMNI: 'alumni',
  ADMIN: 'admin',
  STUDENT: 'student'
};

// Event types
exports.EVENT_TYPES = {
  REUNION: 'reunion',
  WORKSHOP: 'workshop',
  SEMINAR: 'seminar',
  NETWORKING: 'networking',
  CAREER_FAIR: 'career_fair',
  WEBINAR: 'webinar'
};

// Job employment types
exports.EMPLOYMENT_TYPES = {
  FULL_TIME: 'Full-time',
  PART_TIME: 'Part-time',
  CONTRACT: 'Contract',
  INTERNSHIP: 'Internship',
  REMOTE: 'Remote'
};

// Experience levels
exports.EXPERIENCE_LEVELS = {
  ENTRY: 'Entry',
  MID: 'Mid',
  SENIOR: 'Senior',
  EXECUTIVE: 'Executive'
};

// Donation purposes
exports.DONATION_PURPOSES = {
  SCHOLARSHIP: 'scholarship',
  INFRASTRUCTURE: 'infrastructure',
  RESEARCH: 'research',
  EVENT: 'event',
  GENERAL: 'general'
};

// Story categories
exports.STORY_CATEGORIES = {
  CAREER: 'career',
  ENTREPRENEURSHIP: 'entrepreneurship',
  RESEARCH: 'research',
  ACHIEVEMENT: 'achievement',
  PHILANTHROPY: 'philanthropy',
  MENTORSHIP: 'mentorship'
};

// Departments
exports.DEPARTMENTS = {
  CSE: 'CSE',
  ECE: 'ECE',
  ME: 'ME',
  CE: 'CE',
  EE: 'EE',
  IT: 'IT'
};

// Payment methods
exports.PAYMENT_METHODS = {
  CREDIT_CARD: 'credit_card',
  PAYPAL: 'paypal',
  BANK_TRANSFER: 'bank_transfer',
  UPI: 'upi'
};

// Application status
exports.APPLICATION_STATUS = {
  PENDING: 'pending',
  REVIEWED: 'reviewed',
  SHORTLISTED: 'shortlisted',
  REJECTED: 'rejected'
};

// Event registration status
exports.EVENT_STATUS = {
  REGISTERED: 'registered',
  ATTENDED: 'attended',
  CANCELLED: 'cancelled'
};

// Donation status
exports.DONATION_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded'
};

// Profile visibility
exports.VISIBILITY = {
  PUBLIC: 'public',
  ALUMNI_ONLY: 'alumni-only',
  PRIVATE: 'private'
};

// Notification types
exports.NOTIFICATION_TYPES = {
  CONNECTION_REQUEST: 'connection_request',
  JOB_APPLICATION: 'job_application',
  EVENT_REGISTRATION: 'event_registration',
  DONATION_RECEIPT: 'donation_receipt',
  STORY_COMMENT: 'story_comment',
  MENTORSHIP_REQUEST: 'mentorship_request'
};

// Pagination defaults
exports.PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100
};

// File upload limits
exports.FILE_LIMITS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
  ALLOWED_DOC_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
};

// Cache TTL (in seconds)
exports.CACHE_TTL = {
  SHORT: 300, // 5 minutes
  MEDIUM: 1800, // 30 minutes
  LONG: 3600 // 1 hour
};

// Validation patterns
exports.PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  PHONE: /^[\+]?[1-9][\d]{0,15}$/,
  ZIP_CODE: /^\d{5}(-\d{4})?$/,
  URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
};

// Error messages
exports.ERROR_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PASSWORD: 'Password must be at least 8 characters with uppercase, lowercase, number and special character',
  PASSWORD_MISMATCH: 'Passwords do not match',
  USER_EXISTS: 'User already exists with this email',
  USER_NOT_FOUND: 'User not found',
  INVALID_CREDENTIALS: 'Invalid email or password',
  UNAUTHORIZED: 'You are not authorized to perform this action',
  NOT_FOUND: 'Resource not found',
  INTERNAL_ERROR: 'An internal error occurred. Please try again later.',
  FILE_TOO_LARGE: 'File size exceeds the maximum limit',
  INVALID_FILE_TYPE: 'Invalid file type',
  EMAIL_SEND_FAILED: 'Failed to send email'
};

// Success messages
exports.SUCCESS_MESSAGES = {
  REGISTER_SUCCESS: 'Registration successful. Please check your email for verification.',
  LOGIN_SUCCESS: 'Login successful',
  LOGOUT_SUCCESS: 'Logged out successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
  PASSWORD_CHANGED: 'Password changed successfully',
  EMAIL_SENT: 'Email sent successfully',
  OPERATION_SUCCESS: 'Operation completed successfully',
  FILE_UPLOADED: 'File uploaded successfully'
};