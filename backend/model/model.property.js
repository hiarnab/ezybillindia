const mysql = require('mysql2/promise');
const db = require('../lib/db');

async function getFormattedDateWithOffset(offsetDays) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}
async function insertProperty(property) {
  const connection = await db();
  const AllotedPropertyQuota = await connection.query('SELECT AllotedPropertyQuota from tblmastercustomer where CustomerNo=?', [property.CustomerNo]);
  const propertyCount = await connection.query('SELECT count(CustomerNo) as count from tblmasterproperty where CustomerNo=?', [property.CustomerNo]);
  if (propertyCount[0][0].count >= AllotedPropertyQuota[0][0].AllotedPropertyQuota) {
    const err = new Error('Property Quota Exhausted');
    err.code = 'ERR_QOUTA_EXHAUSTED';
    throw err;
  }
  let PropertyNo = await connection.query('select max(PropertyNo) as propNo from tblmasterproperty;');
  if (PropertyNo[0][0].propNo) {
    PropertyNo = PropertyNo[0][0].propNo + 10;
  }
  else {
    PropertyNo = 10;
  }
  // eslint-disable-next-line
  property.PropertyNo = PropertyNo;
  const query = mysql.format('INSERT INTO tblmasterproperty SET ?', property);
  await connection.query(query);
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  const fulldate = `${year}-${month}-${day}`;
  const [rows] = await connection.query('SELECT * FROM tblsettings WHERE type = ? AND status = ?', ['trail', 'active']);
  const setting = rows[0];
  const freeDays = parseInt(setting.days, 10);
  const expDate = await getFormattedDateWithOffset(freeDays);
  const data = {
    package_master_id: setting.id,
    property_id: PropertyNo,
    amount_without_tax: setting.amount,
    order_status: 'complete',
    start_date: fulldate,
    expired_at: expDate,
    is_active: 'active',
    created_by: property.CustomerNo
  };
  const squery = `
  INSERT INTO tblpackageplan (package_master_id, property_id, amount_without_tax, order_status, start_date, expired_at, is_active, created_by) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;
  await connection.execute(squery, [
    data.package_master_id,
    data.property_id,
    data.amount_without_tax,
    data.order_status,
    data.start_date,
    data.expired_at,
    data.is_active,
    data.created_by
  ]);
}

async function getAllProperties(customerNo) {
  const connection = await db();
  const query = mysql.format('select * from tblmasterproperty where CustomerNo=?', [customerNo]);
  const result = await connection.query(query);
  return result[0];
}

async function getPropertyById(propertyNo, customerNo) {
  const connection = await db();
  const result = await connection.query('select * from tblmasterproperty where CustomerNo=? and PropertyNo=?', [customerNo, propertyNo]);
  if (result[0].length < 1) {
    const err = new Error('No Such Property');
    err.code = 'ERR_NO_PROPERTY';
    throw err;
  }
  return result[0];
}

async function updateProperty(property, propertyNo, customerNo) {
  const connection = await db();
  const query = mysql.format('UPDATE tblmasterproperty SET ? WHERE CustomerNo=? and PropertyNo=?', [property, customerNo, propertyNo]);
  await connection.query(query);
}

async function deleteProperty(propertyNo, customerNo) {
  const connection = await db();
  const query = mysql.format('DELETE FROM tblmasterproperty WHERE CustomerNo=? and PropertyNo=?', [customerNo, propertyNo]);
  await connection.query(query);
}

async function getPropertyByMenuName(menuName) {
  const connection = await db();
  const result = await connection.query('select PropertyNo, PropName, isMenuActive, MenuType, isActive, rms_active, rms_cust_id, rms_prop_id from tblmasterproperty where PropertyMenuName=?', [menuName]);
  if (result[0].length < 1 || !result[0][0].isMenuActive || !result[0][0].isActive) {
    const err = new Error('No Such Property');
    err.code = 'ERR_NO_PROPERTY';
    throw err;
  }
  return result[0][0];
}

async function getRmsMenu(custId, propId) {
  const connection = await db();
  const result = await connection.query('SELECT * FROM tblrms WHERE rms_cust_id = ? AND rms_prop_id = ?', [custId, propId]);
  return result[0][0];
}
module.exports = {
  insertProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getPropertyByMenuName,
  getRmsMenu
};
