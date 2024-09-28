const mysql = require('mysql2/promise');
const db = require('../lib/db');

async function getImageMenu(PropertyNo) {
  const connection = await db();
  const query = mysql.format('SELECT ImageSequence from tblimagemenu WHERE PropertyNo=?', [PropertyNo]);
  const result = await connection.query(query);
  return result[0];
}

async function insertImageMenu(propertyNo, propertyMenuName, imageMenu) {
  const connection = await db();
  const query = mysql.format('INSERT INTO tblimagemenu SET PropertyNo=?, PropertyMenuName=?, ImageSequence=?', [propertyNo, propertyMenuName, imageMenu]);
  await connection.query(query);
}

async function updateImageMenu(imageMenu, PropertyNo) {
  const connection = await db();
  const query = mysql.format('UPDATE tblimagemenu SET ImageSequence=? WHERE PropertyNo=?', [imageMenu, PropertyNo]);
  await connection.query(query);
}
async function swapImageMenu(updatedImageSequence, propertyNo) {
  const connection = await db();
  const query = mysql.format('UPDATE tblimagemenu SET ImageSequence = ? WHERE PropertyNo = ?', [updatedImageSequence, propertyNo]);
  await connection.query(query);
}
async function deleteImageMenu(updatedImageSequence, propertyNo) {
  const connection = await db();
  const query = mysql.format('UPDATE tblimagemenu SET ImageSequence = ? WHERE PropertyNo = ?', [updatedImageSequence, propertyNo]);
  await connection.query(query);
}

async function deleteImageMenuByPropertyNo(propertyNo) {
  const connection = await db();
  const query = mysql.format('DELETE FROM tblimagemenu WHERE PropertyNo=?', [propertyNo]);
  await connection.query(query);
}

module.exports = {
  getImageMenu,
  insertImageMenu,
  updateImageMenu,
  swapImageMenu,
  deleteImageMenu,
  deleteImageMenuByPropertyNo
};
