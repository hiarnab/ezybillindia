const express = require('express');

const router = express.Router();
const { verifyTokenMiddleware } = require('../lib/token');
const propertyController = require('../controller/admin/controller.property');

router.use(verifyTokenMiddleware);

router.get('/', async (req, res) => {
  const result = await propertyController.getAllProperties();
  if (result.success) {
    return res.json(result.properties);
  }
  return res.status(result.status).json(result.message);
});

router.get('/propertyDetails/:PropertyNo', async (req, res) => {
  const result = await propertyController.propertyDetails(req.params.PropertyNo);
  if (result.success) {
    return res.json(result.propertyDetail);
  }
  return res.status(result.status).json(result.message);
});

router.put('/', async (req, res) => {
  try {
    const id = req.params.PropertyNo;

    // Check if the ID parameter is provided
    if (!id) {
      return res.status(400).json({ message: 'ID parameter is required' });
    }

    // Call the updateProperty function with request body and ID
    const result = await propertyController.updateProperty(req.params.PropertyNo, id);

    // Check the result and respond accordingly
    if (result.success) {
      return res.status(200).json(result);
    }
    // else {
    //   return res.status(400).json({ message: result.error || 'Failed to update property' });
    //  }
  } catch (error) {
    // Handle unexpected errors
    console.error('Error in route:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
