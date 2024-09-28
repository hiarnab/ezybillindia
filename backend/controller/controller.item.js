const itemModel = require('../model/model.item');
const productModel = require('../model/model.product');

async function insertItem(item, PropertyNo, CategoryRN) {
  try {
    // eslint-disable-next-line
    item.PropertyNo = PropertyNo;
    // eslint-disable-next-line
    item.CategoryRN = CategoryRN;
    // item.ItemNameRN = ItemNameRN;
    await itemModel.insertItem(item);
    return { success: true };
  }
  catch (err) {
    // eslint-disable-next-line
    console.log(err);
    return { success: false, status: 500, message: 'Internal Server Error' };
  }
}

async function updateItem(item, CategoryRN, PropertyNo, ItemNameRN) {
  try {
    await itemModel.updateItem(item, CategoryRN, PropertyNo, ItemNameRN);
    return { success: true };
  }
  catch (err) {
    // eslint-disable-next-line
    console.log(err);
    return { success: false, status: 500, message: 'Internal Server Error' };
  }
}

async function deleteItem(CategoryRN, PropertyNo, ItemNameRN) {
  try {
    await productModel.deleteProductByItemNameRN(CategoryRN, PropertyNo, ItemNameRN);
    await itemModel.deleteItem(CategoryRN, PropertyNo, ItemNameRN);
    return { success: true };
  }
  catch (err) {
    // eslint-disable-next-line
    console.log(err);
    return { success: false, status: 500, message: 'Internal Server Error' };
  }
}

async function getItemsByItemCategory(CategoryRN, PropertyNo) {
  try {
    const items = await itemModel.getItemsByItemCategory(CategoryRN, PropertyNo);
    return { success: true, items };
  }
  catch (err) {
    // eslint-disable-next-line
    console.log(err);
    return { success: false, status: 500, message: 'Internal Server Error' };
  }
}

async function getProductsByItem(PropertyNo, CategoryRN, ItemNameRN) {
  try {
    const products = await productModel.getProductsByItem(PropertyNo, CategoryRN, ItemNameRN);
    return { success: true, products };
  }
  catch (err) {
    // eslint-disable-next-line
    console.log(err);
    return { success: false, status: 500, message: 'Internal Server Error' };
  }
}

module.exports = {
  insertItem,
  updateItem,
  deleteItem,
  getItemsByItemCategory,
  getProductsByItem
};
