const express = require('express');

const router = express.Router({ mergeParams: true });
const { verifyTokenMiddleware } = require('../lib/token');
const productController = require('../controller/controller.product');

router.use(verifyTokenMiddleware);

router.post('/', async (req, res) => {
  const result = await productController.insertProduct(req.body, req.params.CategoryRN, req.params.PropertyNo, req.params.ItemNameRN);
  if (result.success) {
    return res.sendStatus(201);
  }
  return res.status(result.status).json(result.message);
});

router.put('/:ProductNameRN', async (req, res) => {
  const result = await productController.updateProduct(req.body, req.params.CategoryRN, req.params.PropertyNo, req.params.ItemNameRN, req.params.ProductNameRN);
  if (result.success) {
    return res.sendStatus(200);
  }
  return res.status(result.status).json(result.message);
});

router.delete('/:ProductNameRN', async (req, res) => {
  const result = await productController.deleteProduct(req.params.CategoryRN, req.params.PropertyNo, req.params.ItemNameRN, req.params.ProductNameRN);
  if (result.success) {
    return res.sendStatus(204);
  }
  return res.status(result.status).json(result.message);
});

router.get('/', async (req, res) => {
  const result = await productController.getProductsByItem(req.params.PropertyNo, req.params.CategoryRN, req.params.ItemNameRN);
  if (result.success) {
    return res.json(result.products);
  }
  return res.status(result.status).json(result.message);
});

module.exports = router;
