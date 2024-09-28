const express = require('express');

const router = express.Router({ mergeParams: true });
const { verifyTokenMiddleware } = require('../lib/token');
const packageController = require('../controller/controller.package');

router.use(verifyTokenMiddleware);

router.get('/plan', async (req, res) => {
  const result = await packageController.getPlan();
  if (result.success) {
    return res.json({
      result
    });
  }
  return res.status(result.status).json(result.message);
});

router.get('/:PropertyNo', async (req, res) => {
  // const result = await packageController.getPackage(req.user.CustomerNo);
  const { PropertyNo } = req.params;
  const result = await packageController.getPackage(PropertyNo);
  if (result.success) {
    return res.json({
      // packages: result.package,
      // plan: result.plan
      result
    });
  }
  return res.status(result.status).json(result.message);
});

module.exports = router;
