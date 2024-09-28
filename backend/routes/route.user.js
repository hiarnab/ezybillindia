const express = require('express');

const router = express.Router({ mergeParams: true });
const userConroller = require('../controller/controller.user');
const { verifyOTPMiddleware } = require('../lib/otp');
const { verifyTokenMiddleware } = require('../lib/token');

router.get('/', verifyTokenMiddleware, async (req, res) => {
  const { RegMobile } = req.user;
  const result = await userConroller.getUserByPhone(RegMobile);
  if (result.success) {
    return res.json(result.data);
  }
  return res.status(result.status).send(result.message);
});

router.post('/otp', async (req, res) => {
  if (req.body.type === 'login') {
    const result = await userConroller.sendLoginOtp(req.body.phone);
    if (result.success) {
      return res.sendStatus(200);
    }
    return res.status(result.status).send(result.message);
  }
  if (req.body.type === 'verify') {
    const result = await userConroller.sendVerifyOtp(req.body.email, req.body.phone);
    if (result.success) {
      return res.sendStatus(200);
    }
    return res.status(result.status).send(result.message);
  }
  return res.sendStatus(400);
});

router.post('/', verifyOTPMiddleware, async (req, res) => {
  const { user, properties } = req.body;
  const result = await userConroller.register(user, properties);
  if (result.success) {
    return res.sendStatus(200);
  }
  return res.status(result.status).json(result.message);
});

router.post('/login', verifyOTPMiddleware, async (req, res) => {
  const result = await userConroller.login(req.body.phone);
  if (result.success) {
    return res.status(200).json({ accessToken: result.accessToken });
  }
  return res.status(result.status).send(result.message);
});

router.put('/', verifyTokenMiddleware, verifyOTPMiddleware, async (req, res) => {
  const { user } = req.body;
  const result = await userConroller.update(user, req.user.CustomerNo);
  if (result.success) {
    return res.sendStatus(200);
  }
  return res.status(result.status).send(result.message);
});

router.put('/email', verifyTokenMiddleware, async (req, res) => {
  const { email, CustomerNo } = req.body;
  const result = await userConroller.updateEmail(email, CustomerNo);
  if (result.success) {
    return res.status(result.status).send(result.message);
  }
  return res.status(result.status).send(result.message);
});

router.put('/modal-date', verifyTokenMiddleware, async (req, res) => {
  const { newDate, CustomerNo } = req.body;
  const result = await userConroller.updateLastDateModalDisplayed(newDate, CustomerNo);
  if (result.success) {
    return res.status(result.status).send(result.message);
  }
  return res.status(result.status).send(result.message);
});

module.exports = router;
