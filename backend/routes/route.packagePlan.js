const express = require('express');
const router = express.Router();
const packageController = require('../controller/controller.packagePlan');

router.post('/', async (req, res) => {
  const {
    property_id,
    type,
    amount,
    taxable_amount,
    tax,
    start_date,
    expired_at
  } = req.body;

  try {
    const result = await packageController.insertPackage(property_id, type, amount, taxable_amount, tax, start_date, expired_at);

    if (result.success) {
      return res.status(201).send();
    } else {
      return res.status(result.status).json({ message: result.message });
    }
  } catch (error) {
    console.error('Package insertion error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
