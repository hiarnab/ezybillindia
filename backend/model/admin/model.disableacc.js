const mysql = require('mysql2/promise');
const db = require('../../lib/db');

async function disableAcc(PropertyNo) {
  const connection = await db();
  const query = mysql.format('UPDATE tblmasterproperty SET isActive = CASE WHEN isActive = 0 THEN 1 ELSE 0 END, isMenuActive = CASE WHEN isMenuActive = 0 THEN 1 ELSE 0 END WHERE PropertyNo = ?;', [PropertyNo]);
  const result = await connection.query(query);
  return result;
}

module.exports = {
  disableAcc
};
