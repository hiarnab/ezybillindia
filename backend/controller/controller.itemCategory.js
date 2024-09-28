const itemCategoryModel = require('../model/model.itemCategory');
const itemModel = require('../model/model.item');
const productModel = require('../model/model.product');

async function insertItemCategory(Itemcategory, PropertyNo) {
  try {
    // eslint-disable-next-line
    Itemcategory.PropertyNo = PropertyNo;
    // Itemcategory.ItemNameRN = ItemNameRN;
    await itemCategoryModel.insertItemCategory(Itemcategory);
    return { success: true };
  }
  catch (err) {
    // eslint-disable-next-line
    console.log(err);
    return { success: false, status: 500, message: 'Internal Server Error' };
  }
}

async function updateItemCategory(Itemcategory, CategoryRN, PropertyNo) {
  try {
    await itemCategoryModel.updateItemCategory(Itemcategory, CategoryRN, PropertyNo);
    return { success: true };
  }
  catch (err) {
    // eslint-disable-next-line
    console.log(err);
    return { success: false, status: 500, message: 'Internal Server Error' };
  }
}

async function deleteItemCategory(CategoryRN, PropertyNo) {
  try {
    await productModel.deleteProductByCategoryRN(CategoryRN, PropertyNo);
    await itemModel.deleteItemByCategoryRN(CategoryRN, PropertyNo);
    await itemCategoryModel.deleteItemCategory(CategoryRN, PropertyNo);
    return { success: true };
  }
  catch (err) {
    // eslint-disable-next-line
    console.log(err);
    return { success: false, status: 500, message: 'Internal Server Error' };
  }
}

async function getItemCategoriesByProperty(PropertyNo) {
  try {
    const itemCategory = await itemCategoryModel.getItemCategoriesByProperty(PropertyNo);
    return { success: true, itemCategory };
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

module.exports = {
  insertItemCategory,
  updateItemCategory,
  deleteItemCategory,
  getItemCategoriesByProperty,
  getItemsByItemCategory
};
