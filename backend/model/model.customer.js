const mysql = require('mysql2/promise');
const db = require('../lib/db');

async function getUserByPhone(phone) {
  const connection = await db();
  const users = await connection.query('SELECT * FROM tblmastercustomer WHERE RegMobile=? AND isActive=1', [phone]);
  if (users[0].length < 1) {
    const err = new Error('No Such User');
    err.code = 'ERR_NO_USER';
    throw err;
  }
  return users[0][0];
}

async function updateUser(user, customerNo) {
  const connection = await db();
  const query = mysql.format('UPDATE tblmastercustomer SET ? WHERE CustomerNo=?', [user, customerNo]);
  await connection.query(query);
}

async function getUserBycustomerNo(customerNo) {
  const connection = await db();
  const query = mysql.format('SELECT * FROM tblmastercustomer WHERE CustomerNo=?', [customerNo]);
  const users = await connection.query(query);
  return users[0][0];
}
async function updateUserEmail(email, customerNo) {
  const connection = await db();
  const query = mysql.format('UPDATE tblmastercustomer SET RegEmail=? WHERE CustomerNo=?', [email, customerNo]);
  await connection.query(query);
}
async function updateLastDateModalDisplayed(newDate, customerNo) {
  const connection = await db();
  const query = mysql.format('UPDATE tblmastercustomer SET LastDateModalDisplayed=? WHERE CustomerNo=?', [newDate, customerNo]);
  await connection.query(query);
}

async function insert(user) {
  const connection = await db();
  let custNo = await connection.execute('select max(CustomerNo) as custNo from tblmastercustomer;');
  if (custNo[0][0].custNo) {
    custNo = custNo[0][0].custNo + 10;
  }
  else {
    custNo = 10;
  }
  // eslint-disable-next-line
  user.CustomerNo = custNo;
  const query = mysql.format('INSERT INTO tblmastercustomer SET ?', user);
  await connection.query(query);
  return custNo;
}

module.exports = {
  getUserByPhone,
  updateUser,
  getUserBycustomerNo,
  updateUserEmail,
  insert,
  updateLastDateModalDisplayed
};
