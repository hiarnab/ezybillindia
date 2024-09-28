const mysql = require('mysql2/promise');
const db = require('../../lib/db');

async function getallmenu(propertyId) {
  const connection = await db();
  const query = mysql.format('SELECT * FROM tblproductname WHERE PropertyNo = ?', [propertyId]);
  const result = await connection.query(query);
  return result[0];
}

module.exports = {
  getallmenu
};
