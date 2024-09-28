const express = require('express');

const router = express.Router({ mergeParams: true });
const { verifyTokenMiddleware } = require('../lib/token');
const paymentController = require('../controller/admin/controller.payment');

router.use(verifyTokenMiddleware);

router.get('/', async (req, res) => {
  const result = await paymentController.getAllpayment();
  if (result.success) {
    return res.json(result.getPayment);
  }
  return res.status(result.status).json(result.message);
});

module.exports = router;
