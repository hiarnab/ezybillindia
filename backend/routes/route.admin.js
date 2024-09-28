const express = require('express');

const router = express.Router();
const authController = require('../controller/admin/controller.authorization');

router.post('/', async (req, res) => {
  try {
    const result = await authController.login(req, res);
    if (result.success) {
      return res.json(201).send();
    }
    return res.status(result.status).send(result.message);
  }
  catch (error) {
    console.error('Login route error:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
