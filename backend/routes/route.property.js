const express = require('express');

const router = express.Router({ mergeParams: true });
const { verifyTokenMiddleware } = require('../lib/token');
const propertyController = require('../controller/controller.porperty');

router.use(verifyTokenMiddleware);

router.get('/', async (req, res) => {
  const result = await propertyController.getAllProperties(req.user.CustomerNo);
  if (result.success) {
    return res.json(result.properties);
  }
  return res.status(result.status).json(result.message);
});

router.post('/', async (req, res) => {
  const result = await propertyController.createProperty(req.body, req.user.CustomerNo);
  if (result.success) {
    return res.sendStatus(201);
  }
  return res.status(result.status).json(result.message);
});

router.get('/:propId', async (req, res) => {
  const result = await propertyController.getPropertyById(req.params.propId, req.user.CustomerNo);
  if (result.success) {
    return res.json(result.property);
  }
  return res.status(result.status).json(result.message);
});

router.put('/:propId', async (req, res) => {
  const result = await propertyController.updateProperty(req.body, req.params.propId, req.user.CustomerNo);
  if (result.success) {
    return res.sendStatus(200);
  }
  return res.status(result.status).json(result.message);
});

router.delete('/:propId', async (req, res) => {
  const result = await propertyController.deleteProperty(req.params.propId, req.user.CustomerNo);
  if (result.success) {
    return res.sendStatus(204);
  }
  return res.status(result.status).json(result.message);
});

router.get('/:propId/itemCategory', async (req, res) => {
  const result = await propertyController.getItemCategoriesByProperty(req.params.propId);
  if (result.success) {
    return res.json(result.itemCategories);
  }
  return res.status(result.status).json(result.message);
});

router.get('/:propId/item', async (req, res) => {
  const result = await propertyController.getItemsByProperty(req.params.propId);
  if (result.success) {
    return res.json(result.items);
  }
  return res.status(result.status).json(result.message);
});

router.get('/:propId/product', async (req, res) => {
  const result = await propertyController.getProductsByProperty(req.params.propId);
  if (result.success) {
    return res.json(result.products);
  }
  return res.status(result.status).json(result.message);
});

module.exports = router;
