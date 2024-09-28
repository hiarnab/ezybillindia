const express = require('express');

const router = express.Router({ mergeParams: true });
const { verifyTokenMiddleware } = require('../lib/token');
const profileController = require('../controller/admin/controller.profile');

router.use(verifyTokenMiddleware);

router.get('/', async (req, res) => {
  const data = req.user.user.id;
  const result = await profileController.getAllprofile(data);
  if (result.success) {
    return res.json(result.getprofile);
  }
  return res.status(result.status).json(result.message);
});

router.post('/update', async (req, res) => {
  const data = req.user.user.id;
  const newPasswords = req.body.password;
  // console.log('new password:', newPasswords);

  // if (!newPasswords) {
  //   return res.status(400).json({ success: false, message: 'New password is required' });
  // }
  const result = await profileController.updatePassword(newPasswords, data);

  if (result.success) {
    return res.json(result);
  }
  return res.status(result.status).json(result.message);
});

module.exports = router;
