const express = require('express');

const router = express.Router({ mergeParams: true });
const { verifyTokenMiddleware } = require('../lib/token');
const menuController = require('../controller/admin/controller.menu');

router.use(verifyTokenMiddleware);

router.get('/:ProductNameRN', async (req, res) => {
  const result = await menuController.getAllmenu(req.params.ProductNameRN);
  if (result.success) {
    return res.json(result.getmenu);
  }
  return res.status(result.status).json(result.message);
});

module.exports = router;
