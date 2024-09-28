const express = require('express');

const router = express.Router({ mergeParams: true });
const { verifyTokenMiddleware } = require('../lib/token');
const itemController = require('../controller/controller.item');

router.use(verifyTokenMiddleware);

router.post('/', async (req, res) => {
  const result = await itemController.insertItem(req.body, req.params.PropertyNo, req.params.CategoryRN);
  if (result.success) {
    return res.sendStatus(201);
  }
  return res.status(result.status).json(result.message);
});

router.put('/:ItemNameRN', async (req, res) => {
  const result = await itemController.updateItem(req.body, req.params.CategoryRN, req.params.PropertyNo, req.params.ItemNameRN);
  if (result.success) {
    return res.sendStatus(200);
  }
  return res.status(result.status).json(result.message);
});

router.delete('/:ItemNameRN', async (req, res) => {
  const result = await itemController.deleteItem(req.params.CategoryRN, req.params.PropertyNo, req.params.ItemNameRN);
  if (result.success) {
    return res.sendStatus(204);
  }
  return res.status(result.status).json(result.message);
});

router.get('/', async (req, res) => {
  const result = await itemController.getItemsByItemCategory(req.params.CategoryRN, req.params.PropertyNo);
  if (result.success) {
    return res.json(result.items);
  }
  return res.status(result.status).json(result.message);
});

module.exports = router;
