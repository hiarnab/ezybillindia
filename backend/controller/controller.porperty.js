const propertyModel = require('../model/model.property');
const itemCategoryModel = require('../model/model.itemCategory');
const itemModel = require('../model/model.item');
const productModel = require('../model/model.product');
const qr = require('../lib/qr');
const imageMenuModel = require('../model/model.imageMenu');

async function getAllProperties(customerNo) {
  try {
    const properties = await propertyModel.getAllProperties(customerNo);
    return { success: true, properties };
  }
  catch (err) {
    // eslint-disable-next-line
    console.log(err);
    return { success: false, status: 500, message: 'Internal Server Error' };
  }
}

async function createProperty(property, customerNo) {
  try {
    // eslint-disable-next-line no-param-reassign
    property.CustomerNo = customerNo;
    const PropertyMenuName = `${property.PropName.trim().replace(' ', '-')}-${new Date().getTime()}`;
    // eslint-disable-next-line no-param-reassign
    property.PropertyMenuName = PropertyMenuName;
    // eslint-disable-next-line no-param-reassign
    property.QRLocation = await qr.generateQR(`${process.env.MENU_URL}/${PropertyMenuName}`, PropertyMenuName);
    // eslint-disable-next-line no-param-reassign
    // property.QRLocation = `${process.env.URL}/assets/qrcodes/${PropertyMenuName}.png`;
    await propertyModel.insertProperty(property);
    return { success: true };
  }
  catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      if (err.message.includes('tblmasterproperty_ph_un')) {
        return { success: false, status: 400, message: 'ERR_DUP_PHONE' };
      }
      if (err.message.includes('tblmasterproperty_em_un')) {
        return { success: false, status: 400, message: 'ERR_DUP_EMAIL' };
      }
      // eslint-disable-next-line
      console.log(err);
      return { success: false, status: 500, message: 'Internal Server Error' };
    }
    if (err.code === 'ERR_QOUTA_EXHAUSTED') {
      return { success: false, status: 406, message: 'ERR_QOUTA_EXHAUSTED' };
    }
    // eslint-disable-next-line
    console.log(err);
    return { success: false, status: 500, message: 'Internal Server Error' };
  }
}

async function getPropertyById(propertyNo, customerNo) {
  try {
    const property = await propertyModel.getPropertyById(propertyNo, customerNo);
    return { success: true, property };
  }
  catch (err) {
    if (err.code === 'ERR_NO_PROPERTY') {
      return { success: false, status: 400, message: err.code };
    }
    // eslint-disable-next-line
    console.log(err);
    return { success: false, status: 500, message: 'Internal Server Error' };
  }
}

async function updateProperty(property, propertyNo, customerNo) {
  try {
    const propertyDetail = await propertyModel.getPropertyById(propertyNo, customerNo);
    if (propertyDetail[0].hasActiveDesktopLicense) {
      return { success: false, status: 403, message: 'ERR_LICENSED_PROPERTY' };
    }
    await propertyModel.updateProperty(property, propertyNo, customerNo);
    return { success: true };
  }
  catch (err) {
    // eslint-disable-next-line
    console.log(err);
    return { success: false, status: 500, message: 'Internal Server Error' };
  }
}

async function deleteProperty(propertyNo, customerNo) {
  try {
    await productModel.deleteProductByPropertyNo(propertyNo);
    await itemModel.deleteItemByPropertyNo(propertyNo);
    await itemCategoryModel.deleteItemCategoryByPropertyNo(propertyNo);
    await imageMenuModel.deleteImageMenuByPropertyNo(propertyNo);
    await propertyModel.deleteProperty(propertyNo, customerNo);
    return { success: true };
  }
  catch (err) {
    // eslint-disable-next-line
    console.log(err);
    return { success: false, status: 500, message: 'Internal Server Error' };
  }
}

async function getItemCategoriesByProperty(propertyNo) {
  try {
    const itemCategories = await itemCategoryModel.getItemCategoriesByProperty(propertyNo);
    return { success: true, itemCategories };
  }
  catch (err) {
    // eslint-disable-next-line
    console.log(err);
    return { success: false, status: 500, message: 'Internal Server Error' };
  }
}

async function getItemsByProperty(propertyNo) {
  try {
    const items = await itemModel.getItemsByProperty(propertyNo);
    return { success: true, items };
  }
  catch (err) {
    // eslint-disable-next-line
    console.log(err);
    return { success: false, status: 500, message: 'Internal Server Error' };
  }
}

async function getProductsByProperty(propertyNo) {
  try {
    const products = await productModel.getProductsByProperty(propertyNo);
    return { success: true, products };
  }
  catch (err) {
    // eslint-disable-next-line
    console.log(err);
    return { success: false, status: 500, message: 'Internal Server Error' };
  }
}

module.exports = {
  getAllProperties,
  createProperty,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getItemCategoriesByProperty,
  getItemsByProperty,
  getProductsByProperty
};
