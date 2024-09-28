const mysql = require('mysql2/promise');
const db = require('../lib/db');

async function getPackage(PropertyNo) {
  const connection = await db();
  const isActiveStatus = 'active';
  const plan = mysql.format('SELECT tblpackageplan.*, tblsettings.* FROM tblpackageplan INNER JOIN tblsettings ON tblpackageplan.package_master_id = tblsettings.id WHERE tblpackageplan.property_id = ? AND tblpackageplan.is_active = ?', [PropertyNo, isActiveStatus]);
  const [planResult] = await connection.query(plan);
  return {
    success: true,
    plan: planResult[0]
  };
}

async function getPlan() {
  const connection = await db();
  const trail = 'trail';
  const query = mysql.format('SELECT * FROM tblsettings WHERE title != ?', [trail]);
  const result = await connection.query(query);
  return {
    success: true,
    package: result[0]
  };
}

module.exports = {
  getPackage,
  getPlan
};
