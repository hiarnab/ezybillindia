const express = require('express');
const homeConroller = require('../controller/controller.home');

const router = express.Router({ mergeParams: true });

router.post('/form/:formName', async (req, res) => {
  // console.log(req.params.formName);
  const result = await homeConroller.insertFormData(req.params.formName, req.body);

  if (result.success) {
    return res.sendStatus(201);
  }
  return res.status(result.status).send(result.message);
});

router.get('/menu/:menuName', async (req, res) => {
  const result = await homeConroller.getMenu(req.params.menuName);
  if (result.success) {
    return res.status(result.status).json(result.data);
  }
  return res.status(result.status).send(result.message);
});

module.exports = router;
