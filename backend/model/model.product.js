const mysql = require('mysql2/promise');
const db = require('../lib/db');

async function insertProduct(product) {
  const connection = await db();
  // product.RoomUnitPrice = product.RoomUnitPrice === '' ? 0 : product.RoomUnitPrice;
  const query = mysql.format('INSERT INTO tblproductname SET ?');
  await connection.query(query, [product]);
}

async function updateProduct(product, categoryRN, propertyNo, itemNameRN, productNameRN) {
  const connection = await db();
  const query = mysql.format(
    'UPDATE tblproductname SET ? WHERE CategoryRN=? AND PropertyNo=? AND ItemNameRN=? AND ProductNameRN=?',
    [product, categoryRN, propertyNo, itemNameRN, productNameRN]
  );
  await connection.query(query);
}

async function deleteProductById(categoryRN, propertyNo, itemNameRN, productNameRN) {
  const connection = await db();
  const query = mysql.format(
    'DELETE FROM tblproductname WHERE CategoryRN=? AND PropertyNo=? AND ItemNameRN=? AND ProductNameRN=?',
    [categoryRN, propertyNo, itemNameRN, productNameRN]
  );
  await connection.query(query);
}

async function getProductsByItem(propertyNo, categoryRN, itemNameRN) {
  const connection = await db();
  const query = mysql.format('SELECT * from tblproductname WHERE PropertyNo=? AND CategoryRN=? AND ItemNameRN=?', [propertyNo, categoryRN, itemNameRN]);
  const result = await connection.query(query);
  return result[0];
}

async function getProductsByProperty(propertyNo) {
  const connection = await db();
  const query = mysql.format(`SELECT tblproductname.*,tblitemcategory.ItemCategory,tblitemcategory.NoteOnItemCategory,tblitemname.ItemName,tblitemname.NoteOnItem 
                              FROM tblitemcategory JOIN tblitemname 
                                ON tblitemname.PropertyNo=tblitemcategory.PropertyNo and tblitemcategory.CategoryRN =tblitemname.CategoryRN 
                              JOIN tblproductname 
                                ON tblitemname.PropertyNo=tblproductname.PropertyNo and tblitemname.CategoryRN =tblproductname.CategoryRN and tblitemname.ItemNameRN =tblproductname.ItemNameRN 
                              WHERE tblproductname.PropertyNo=? and tblproductname.IsSuspended is not true`, [propertyNo]);
  const result = await connection.query(query);
  return result[0];
}

async function deleteProductByItemNameRN(categoryRN, propertyNo, itemNameRN) {
  const connection = await db();
  const query = mysql.format(
    'DELETE FROM tblproductname WHERE CategoryRN=? AND PropertyNo=? AND ItemNameRN=?',
    [categoryRN, propertyNo, itemNameRN]
  );
  await connection.query(query);
}

async function deleteProductByCategoryRN(categoryRN, propertyNo) {
  const connection = await db();
  const query = mysql.format(
    'DELETE FROM tblproductname WHERE CategoryRN=? AND PropertyNo=?',
    [categoryRN, propertyNo]
  );
  await connection.query(query);
}

async function deleteProductByPropertyNo(propertyNo) {
  const connection = await db();
  const query = mysql.format(
    'DELETE FROM tblproductname WHERE PropertyNo=?',
    [propertyNo]
  );
  await connection.query(query);
}

module.exports = {
  insertProduct,
  updateProduct,
  deleteProductById,
  getProductsByItem,
  getProductsByProperty,
  deleteProductByItemNameRN,
  deleteProductByCategoryRN,
  deleteProductByPropertyNo
};
