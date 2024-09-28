const express = require('express');

const router = express.Router({ mergeParams: true });
const { verifyTokenMiddleware } = require('../lib/token');
const dashboardController = require('../controller/admin/controller.dashboard');

router.use(verifyTokenMiddleware);

router.get('/', async (req, res) => {
  const result = await dashboardController.getDashboard();
  if (result.success) {
    return res.json(result.getreport);
  }
  return res.status(result.status).json(result.message);
});

router.get('/inactive', async (req, res) => {
  const result = await dashboardController.getinactiveproperty();
  if (result.success) {
    return res.json(result.getinactivepro);
  }
  return res.status(result.status).json(result.message);
});

router.get('/renewal', async (req, res) => {
  const result = await dashboardController.getPackageRenewal();
  if (result.success) {
    return res.json(result.getPackageRen);
  }
  return res.status(result.status).json(result.message);
});

router.get('/today', async (req, res) => {
  const result = await dashboardController.getPaymentToday();
  if (result.success) {
    return res.json(result.PaymentToday);
  }
  return res.status(result.status).json(result.message);
});

router.get('/thisweek', async (req, res) => {
  const result = await dashboardController.getPaymentThisWeek();
  if (result.success) {
    return res.json(result.Paymentthisweek);
  }
  return res.status(result.status).json(result.message);
});

router.get('/thismonth', async (req, res) => {
  const result = await dashboardController.getPaymentThismonth();
  if (result.success) {
    return res.json(result.Paymentthimonth);
  }
  return res.status(result.status).json(result.message);
});

module.exports = router;
