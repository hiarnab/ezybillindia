const express = require('express');

const router = express.Router({ mergeParams: true });
const { verifyTokenMiddleware } = require('../lib/token');
const settngController = require('../controller/admin/controller.setting');

router.use(verifyTokenMiddleware);

router.get('/', async (req, res) => {
  const result = await settngController.getAllpackage();
  if (result.success) {
    return res.json(result.packageSetting);
  }
  return res.status(result.status).json(result.message);
});

// router.put('/', async (req, res) => {
//   try {
//     const { id } = req.query.id;
//     if (!id) {
//       return res.status(400).json({ message: 'ID parameter is required' });
//     }
//     const result = await settngController.insertAllpackage(req.body, id);
//     if (result.success) {
//       // return res.sendStatus(201);
//       return res.status(200).json(result.updatedData);
//     } else {
//       return res.status(400).json({ message: result.error });
//     }
//     // return res.status(result.status).json(result.package);
//   } catch (error) {
//     console.error('Error in route:', error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

router.put('/batch', async (req, res) => {
  try {
    const { packages } = req.body;
    if (!packages || !Array.isArray(packages)) {
      return res.status(400).json({ message: 'Packages data is required and should be an array' });
    }

    const result = await settngController.insertAllpackage(packages);

    if (result.success) {
      return res.status(200).json(result.updatedData);
    } else {
      return res.status(400).json({ message: result.error });
    }
  } catch (error) {
    console.error('Error in batch update route:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
