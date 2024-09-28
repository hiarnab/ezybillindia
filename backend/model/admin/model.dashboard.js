const mysql = require('mysql2/promise');
const db = require('../../lib/db');

async function getDashboard() {
  const connection = await db();
  const query = mysql.format('SELECT COUNT(PropertyNo) AS property FROM tblmasterproperty WHERE isActive = 1');
  const result = await connection.query(query);
  return result;
}

async function getinactiveproperty() {
  const connection = await db();
  const query = mysql.format('SELECT COUNT(PropertyNo) AS property FROM tblmasterproperty WHERE isActive = 0');
  const result = await connection.query(query);
  return result;
}

async function packageRenewwal() {
  const connection = await db();
  const query = mysql.format('SELECT COUNT(expired_at) AS packagerenewal FROM tblpackageplan WHERE is_active = ?', ['active']);
  const result = await connection.query(query);
  return result[0];
}

async function paymentToday() {
  const connection = await db();
  const query = mysql.format('SELECT COUNT(created_at) AS todaypay FROM tbltransaction');
  const result = await connection.query(query);
  return result[0];
}

async function paymentThisweek() {
  const connection = await db();
  const query = mysql.format('SELECT COUNT(created_at) AS todaypay FROM tbltransaction');
  const result = await connection.query(query);
  return result[0];
}

async function paymentThismonth() {
  const connection = await db();
  const query = mysql.format('SELECT COUNT(created_at) AS todaypay FROM tbltransaction');
  const result = await connection.query(query);
  return result[0];
}

module.exports = {
  getDashboard,
  getinactiveproperty,
  packageRenewwal,
  paymentToday,
  paymentThisweek,
  paymentThismonth
};
