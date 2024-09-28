const PropertyModel = require('../../model/admin/model.property');

async function getAllProperties() {
  try {
    const properties = await PropertyModel.getAllProperty();
    return { success: true, properties };
  }
  catch (err) {
    console.log(err);
    return { success: false, status: 500, message: 'Internal Server Error' };
  }
}

async function propertyDetails(PropertyNo) {
  try {
    const propertyDetail = await PropertyModel.propertyDetails(PropertyNo);
    return { success: true, propertyDetail };
  }
  catch (err) {
    console.log(err);
    return { success: false, status: 500, message: 'Internal Server Error' };
  }
}

async function updateProperty(property, id) {
  try {
    const result = await PropertyModel.updateProperty(property, id);
    return { success: true, result };
  }
  catch (error) {
    console.error('Error in Controller:', error);
    return { success: true, status: 500, message: 'Internal Server Error' };
  }
}

module.exports = {
  getAllProperties,
  updateProperty,
  propertyDetails
};
