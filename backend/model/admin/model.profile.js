const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const db = require('../../lib/db');

async function getallprofile(userId) {
  const connection = await db();
  const query = mysql.format('SELECT * FROM tbluser WHERE id = ?');
  const result = await connection.query(query, [userId]);
  return result;
}

async function updatePassword(newPasswords, userId) {
  try {
    const connection = await db();
    const hashedPassword = await bcrypt.hash(newPasswords, 10);

    const updateQuery = 'UPDATE tbluser SET password = ? WHERE id = ?';
    const parameters = [hashedPassword, userId];
    const [result] = await connection.execute(updateQuery, parameters);

    return {
      success: true,
      result
    };
  }
  catch (error) {
    console.error('Error in UPDATE PASSWORD:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

module.exports = {
  getallprofile,
  updatePassword
};
