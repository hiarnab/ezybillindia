const express = require('express');

const router = express.Router();
const { verifyTokenMiddleware } = require('../lib/token');
const toolsController = require('../controller/admin/controller.tools');

router.use(verifyTokenMiddleware);

router.get('/customer', async (req, res) => {
  const result = await toolsController.getCustomer();
  if (result.success) {
    return res.json(result.customers);
  }
  return res.status(result.status).json(result.message);
});

router.get('/property', async (req, res) => {
  const data = req.query.selectedCustomer;
  const result = await toolsController.getProperty(data);
  if (result.success) {
    return res.json(result.property);
  }
  return res.status(result.status).json(result.message);
});

router.post('/update/property', async (req, res) => {
  const { rmsCustId, rmsPropId, propertyNo } = req.body;
  try {
    const result = await toolsController.updateFields(propertyNo, rmsCustId, rmsPropId);
    if (result.success) {
      return res.status(200).json({ message: 'Update successful' });
    } else {
      return res.status(400).json({ message: 'Update failed' });
    }
  } catch (error) {
    console.error("Error updating fields:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
