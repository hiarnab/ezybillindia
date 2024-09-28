const express = require('express');

const router = express.Router({ mergeParams: true });
const { verifyTokenMiddleware } = require('../lib/token');
const lifetimefreeController = require('../controller/admin/controller.lifetimefree');

router.use(verifyTokenMiddleware);

router.get('/:PropertyNo', async (req, res) => {
  const data = req.params.PropertyNo;
  //   console.log(data);
  const result = await lifetimefreeController.lifetimefree(data);
  if (result.success) {
    return res.json(result);
  }
  return res.status(result.status).json(result.message);
});

module.exports = router;
