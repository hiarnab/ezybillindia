const mysql = require('mysql2/promise');
const db = require('../lib/db');

async function insertItemCategory(itemCategory) {
  const connection = await db();
  const query = mysql.format('INSERT INTO tblitemcategory SET ?', itemCategory);
  await connection.query(query);
}

async function updateItemCategory(itemCategory, categoryRN, propertyNo) {
  const connection = await db();
  const query = mysql.format('UPDATE tblitemcategory SET ? WHERE CategoryRN=? AND PropertyNo=?', [itemCategory, categoryRN, propertyNo]);
  await connection.query(query);
}

async function deleteItemCategory(categoryRN, propertyNo) {
  const connection = await db();
  const query = mysql.format('DELETE FROM tblitemcategory WHERE CategoryRN=? and PropertyNo=?', [categoryRN, propertyNo]);
  await connection.query(query);
}

async function getItemCategoriesByProperty(propertyNo) {
  const connection = await db();
  const query = mysql.format('SELECT * FROM tblitemcategory WHERE PropertyNo=?', [propertyNo]);
  const result = await connection.query(query);
  return result[0];
}

async function deleteItemCategoryByPropertyNo(propertyNo) {
  const connection = await db();
  const query = mysql.format('DELETE FROM tblitemcategory WHERE PropertyNo=?', [propertyNo]);
  await connection.query(query);
}

module.exports = {
  insertItemCategory,
  updateItemCategory,
  deleteItemCategory,
  getItemCategoriesByProperty,
  deleteItemCategoryByPropertyNo
};
