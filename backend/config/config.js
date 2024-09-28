const path = require('path');

const root = require.main.path;

exports.MenuImages = path.join(root, '/public/menuImages');
exports.testEmail = 'noreply@ezybillindia.com';
exports.testEmailPassword = 'APP-PASSWORD';
exports.adminEmail = process.env.ADMIN_EMAIL;
exports.fromEmail = process.env.FROM_EMAIL;
exports.key_id = process.env.RAZORPAY_ID;
exports.key_secret = process.env.RAZORPAY_SECRET;
