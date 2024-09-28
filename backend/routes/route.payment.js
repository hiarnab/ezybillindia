const express = require('express');

const router = express.Router({ mergeParam: true });
const { verifyTokenMiddleware } = require('../lib/token');
const paymentController = require('../controller/controller.payment');

router.use(verifyTokenMiddleware);

router.get('/', async (req, res) => {
  const result = await paymentController.getAllPayment(req.user.CustomerNo);
  if (result.success) {
    return res.json(result.payment);
  }
  return res.status(result.status).json(result.message);
});

module.exports = router;
