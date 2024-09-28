const { stat } = require('fs-extra');
const toolsModel = require('../../model/admin/model.tools');

async function getCustomer() {
  try {
    const customers = await toolsModel.getCustomer();
    return { success: true, customers };
  }
  catch (err) {
    console.log(err);
    return { success: false, status: 500, message: 'Internal Server Error' };
  }
}

async function getProperty(data) {
  try {
    const property = await toolsModel.getProperty(data);
    return { success: true, property };
  }
  catch (err) {
    console.log(err);
    return { success: false, status: 500, message: 'Internal Server Error' };
  }
}

async function updateFields(propertyNo, rmsCustId, rmsPropId) {
  try {
    const updateData = await toolsModel.updateFields(propertyNo, rmsCustId, rmsPropId);
    return { success: true, updateData };
  }
  catch (err) {
    console.log(err);
    return { success: false, status: 500, message: 'Internal Server Error' };
  }
}

module.exports = {
  getCustomer,
  getProperty,
  updateFields
};
