const mysql = require('mysql2/promise');
const db = require('../lib/db');

async function insertPackage(package_seeting) {
  try {
    const connection = await db(); // Establish database connection
    console.log(package_seeting);
    const [result] = await connection.execute('INSERT INTO tblsettings SET ?', package_seeting);
    return result[0]; // Return the ID of the inserted row if needed
  }
  catch (error) {
    console.error('Database error:', error.message);
    throw error; // Propagate the error back to the caller
  }
  finally {
    await connection.end();
  }
}


module.exports = {
  insertPackage
};
