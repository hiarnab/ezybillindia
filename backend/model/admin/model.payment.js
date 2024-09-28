const mysql = require('mysql2/promise');
const db = require('../../lib/db');

async function getallpayment() {
  const connection = await db();

  try {
    const [rows] = await connection.execute(`
      SELECT tbltransaction.*, tblmasterproperty.*, tblmastercustomer.*
      FROM tbltransaction
      JOIN tblmasterproperty ON tbltransaction.property_id = tblmasterproperty.PropertyNo
      JOIN tblmastercustomer ON tblmasterproperty.CustomerNo = tblmastercustomer.CustomerNo;
    `);

    return rows;
  }
  catch (err) {
    console.error('Error executing query:', err);
    throw err;
  }
}

module.exports = {
  getallpayment
};
