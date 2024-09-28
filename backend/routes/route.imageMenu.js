const express = require('express');
const multer = require('multer');

const router = express.Router({ mergeParams: true });
const { verifyTokenMiddleware } = require('../lib/token');

const imageMenuController = require('../controller/controller.imageMenu');

const upload = multer();

router.use(verifyTokenMiddleware);

router.get('/', async (req, res) => {
  const result = await imageMenuController.getImageMenu(req.params.PropertyNo, req.body);
  if (result.success) {
    return res.json({
      success: true,
      imageMenu: result.imageMenu
    });
  }
  return res.status(result.status).json(result.message);
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.params.PropertyNo || !req.file) {
      return res.status(400).json({ message: 'Invalid request. PropertyNumber and Image are required.' });
    }

    const result = await imageMenuController.insertImageMenu(req.params.PropertyNo, req.file.buffer, req.body.text, req.user.CustomerNo);

    if (result.success) {
      return res.status(200).json({ success: true, message: 'Menu Successfully Added' });
    }
    return res.status(result.status).json(result.message);
  }
  catch (error) {
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

router.put('/image-caption', async (req, res) => {
  const result = await imageMenuController.updateImageCaption(req.params.PropertyNo, req.body.position, req.body.text);

  if (result.success) {
    return res.status(200).json({ success: true, message: 'Menu Successfully Updated', data: result.imageMenu });
  }
  return res.status(result.status).json(result.message);
});

router.put('/', async (req, res) => {
  const result = await imageMenuController.swapImageMenu(req.params.PropertyNo, req.body[0], req.body[1]);

  if (result.success) {
    return res.status(200).json({ success: true, message: 'Menu Successfully Swapped', data: result.imageMenu });
  }
  return res.status(result.status).json(result.message);
});

router.delete('/', async (req, res) => {
  const result = await imageMenuController.deleteImage(req.params.PropertyNo, req.body[0]);
  if (result.success) {
    return res.status(200).json({ success: true, message: 'Menu Successfully Swapped', data: result.imageMenu });
  }
  return res.status(result.status).json(result.message);
});

module.exports = router;
