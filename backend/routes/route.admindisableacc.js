const express = require('express');

const router = express.Router({ mergeParams: true });
const { verifyTokenMiddleware } = require('../lib/token');
const disableaccController = require('../controller/admin/controller.disable');

router.use(verifyTokenMiddleware);

router.get('/:PropertyNo', async (req, res) => {
  const data = req.params.PropertyNo;
  const result = await disableaccController.disableAcc(data);
  if (result.success) {
    return res.json(result);
  }
  return res.status(result.status).json(result.message);
});

module.exports = router;
