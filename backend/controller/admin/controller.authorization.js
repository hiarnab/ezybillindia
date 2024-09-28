const jwt = require('jsonwebtoken');
const authorizationModal = require('../../model/admin/model.authorization');

const secret = process.env.JWT_PRIVATE_KEY;
async function login(req, res) {
  try {
    const { phone, password } = req.body;
    if (!phone || !password) {
      return res.status(400).json({ success: false, message: 'Phone and password are required' });
    }
    const result = await authorizationModal.auth(phone, password);
    if (result && result.id) {
      const data = {
        user: {
          id: result.id
        }
      };
      const authToken = jwt.sign(data, secret);
      return res.status(200).json({ success: true, accessToken: authToken });
    }
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
    // If login is successful, set up session handling or JWT token generation here
  }
  catch (error) {
    if (error.message === 'No Such User' || error.message === 'Incorrect password') {
      return res.status(401).json({ success: false, message: error.message });
    }
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

module.exports = {
  login
};
