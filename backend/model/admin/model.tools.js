const mysql = require('mysql2/promise');
const db = require('../../lib/db');

async function getCustomer() {
  const connection = await db();
  const query = 'SELECT * FROM tblmastercustomer WHERE isActive = 1';
  const result = await connection.query(query);
  return result[0];
}

async function getProperty(data) {
  const connection = await db();
  const query = 'SELECT * FROM tblmasterproperty WHERE CustomerNo = ? AND isActive = 1';
  const result = await connection.query(query, [data]);
  return result[0];
}

async function updateFields(propertyNo, rmsCustId, rmsPropId) {
  const connection = await db();
  const query = `
    UPDATE tblmasterproperty 
    SET 
      rms_cust_id = CASE WHEN ? = 0 THEN NULL ELSE ? END,
      rms_prop_id = CASE WHEN ? = 0 THEN NULL ELSE ? END,
      rms_active = CASE 
        WHEN (? = 0 OR ? = 0) THEN 0 
        WHEN (? IS NOT NULL AND ? IS NOT NULL) THEN 1 
        ELSE 0 
      END
    WHERE 
      PropertyNo = ?
  `;

  const result = await connection.query(query, [
    rmsCustId, rmsCustId,
    rmsPropId, rmsPropId,
    rmsCustId, rmsPropId,
    rmsCustId, rmsPropId,
    propertyNo
  ]);
  return result[0];
}

module.exports = {
  getCustomer,
  getProperty,
  updateFields
};
