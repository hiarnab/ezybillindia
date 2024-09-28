const mysql = require('mysql2/promise');
const db = require('../lib/db');

async function getItemCategoriesByProperty(propertyId) {
  const connection = await db();
  const query = mysql.format('SELECT * FROM tblrms_itemcategory WHERE rms_property_id', [propertyId]);
  const result = await connection.query(query);
  return result[0];
}

async function getItemsByProperty(propertyId) {
  const connection = await db();
  const query = mysql.format('SELECT tblrms_itemname.*, tblrms_itemcategory.ItemCategory,tblrms_itemcategory.NoteOnItemCategory FROM tblrms_itemname INNER JOIN tblrms_itemcategory ON tblrms_itemname.rms_property_id = tblrms_itemcategory.rms_property_id AND tblrms_itemname.CategoryRN = tblrms_itemcategory.CategoryRN WHERE tblrms_itemname.rms_property_id = ?');
  const result = await connection.query(query, [propertyId]);
  return result[0];
}

async function getProductsByProperty(propertyId) {
  const connection = await db();
  const query = mysql.format('SELECT tblrms_productname.*,tblrms_itemcategory.ItemCategory,tblrms_itemcategory.NoteOnItemCategory,tblrms_itemname.ItemName,tblrms_itemname.NoteOnItem FROM tblrms_itemcategory JOIN tblrms_itemname ON tblrms_itemname.rms_property_id=tblrms_itemcategory.rms_property_id and tblrms_itemcategory.CategoryRN =tblrms_itemname.CategoryRN JOIN tblrms_productname ON tblrms_itemname.rms_property_id=tblrms_productname.PropertyNo  and tblrms_itemname.CategoryRN =tblrms_productname.CategoryRN and tblrms_itemname.ItemNameRN =tblrms_productname.ItemNameRN WHERE tblrms_productname.PropertyNo=? and tblrms_productname.IsSuspended is not true', [propertyId]);
  const result = await connection.query(query);
  return result[0];
}

module.exports = {
  getItemCategoriesByProperty,
  getItemsByProperty,
  getProductsByProperty
};
