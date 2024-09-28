const express = require('express');

const router = express.Router();

const razorpayController = require('../controller/controller.razorpay');

router.post('/createOrder', async (req, res) => {
  try {
    const result = await razorpayController.createOrder(req, res);
    if (result.success) {
      return res.json(201).send();
    }
    return res.status(result.status).send(result.message);
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.get('/paymentDetails/:paymentId', async (req, res) => {
  try {
    await razorpayController.paymentDetails(req, res);
  } catch (error) {
    console.error('Error in route:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
