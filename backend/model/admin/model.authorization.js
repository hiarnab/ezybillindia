const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const db = require('../../lib/db');

async function auth(phone, password) {
  const connection = await db();
  const [rows] = await connection.execute('SELECT * FROM tbluser WHERE phone = ?', [phone]);

  if (rows.length === 0) {
    const err = new Error('No Such User');
    err.code = 'ERR_NO_USER';
    throw err;
  }

  const user = rows[0];
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error('Incorrect password');
  }
  // Optionally, return the user object or just validate the login
  return user;
}

module.exports = {
  auth
};
