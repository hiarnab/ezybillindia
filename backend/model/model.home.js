const mysql = require('mysql2/promise');
const db = require('../lib/db');

async function consultation(formData) {
  const connection = await db();
  const query = mysql.format('INSERT INTO tblconsultation SET ?', formData);
  return connection.query(query);
}

async function demo(formData) {
  const connection = await db();
  const query = mysql.format('INSERT INTO tbldemo SET ?', formData);
  return connection.query(query);
}

async function call(formData) {
  const connection = await db();
  const query = mysql.format('INSERT INTO tblcall SET ?', formData);
  return connection.query(query);
}

module.exports = {
  consultation,
  demo,
  call
};
