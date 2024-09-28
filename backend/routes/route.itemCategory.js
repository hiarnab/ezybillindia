const express = require('express');

const router = express.Router({ mergeParams: true });
const { verifyTokenMiddleware } = require('../lib/token');

const itemCategoryController = require('../controller/controller.itemCategory');

router.use(verifyTokenMiddleware);

router.post('/', async (req, res) => {
  const result = await itemCategoryController.insertItemCategory(req.body, req.params.PropertyNo);
  if (result.success) {
    return res.sendStatus(201);
  }
  return res.status(result.status).json(result.message);
});

router.put('/:CategoryRN', async (req, res) => {
  const result = await itemCategoryController.updateItemCategory(req.body, req.params.CategoryRN, req.params.PropertyNo);
  if (result.success) {
    return res.sendStatus(200);
  }
  return res.status(result.status).json(result.message);
});

router.delete('/:CategoryRN', async (req, res) => {
  const result = await itemCategoryController.deleteItemCategory(req.params.CategoryRN, req.params.PropertyNo);
  if (result.success) {
    return res.sendStatus(204);
  }
  return res.status(result.status).json(result.message);
});

router.get('/', async (req, res) => {
  const result = await itemCategoryController.getItemCategoriesByProperty(req.params.PropertyNo);
  if (result.success) {
    return res.json(result.itemCategory);
  }
  return res.status(result.status).json(result.message);
});

module.exports = router;
