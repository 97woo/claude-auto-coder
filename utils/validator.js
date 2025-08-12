// Email validation function
function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return false;
  }
  
  // Basic email regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Phone number validation function
function validatePhoneNumber(phoneNumber) {
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    return false;
  }
  
  // Remove common formatting characters
  const cleaned = phoneNumber.replace(/[\s\-\(\)\.]/g, '');
  
  // Check if it's a valid phone number (10-15 digits)
  const phoneRegex = /^\+?[1-9]\d{9,14}$/;
  return phoneRegex.test(cleaned);
}

module.exports = {
  validateEmail,
  validatePhoneNumber
};