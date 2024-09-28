const mysql = require('mysql2/promise.js');
const db = require('../../lib/db');

async function getAllpackage() {
  const connection = await db();
  const query = mysql.format('SELECT * FROM tblsettings WHERE status = ? AND type != ?', ['active', 'life_time_free']);
  const result = await connection.query(query);
  return result[0];
}

async function insertAllpackage(packages) {
  const connection = await db();
  try {
    // await connection.beginTransaction();
    const updatePromises = packages.map(pack => {

      if(pack['craeted_at']) {
        pack['craeted_at']  = changeDateFormat(pack['craeted_at']);
      }
      if(pack['updated_at']) {
        pack['updated_at']  = changeDateFormat(pack['updated_at']);
      }

      const updateQuery = mysql.format('UPDATE tblsettings SET ? WHERE id = ?', [pack, pack.id]);
      return connection.execute(updateQuery);
    });
    await Promise.all(updatePromises);
    // await connection.commit();
    const packageIds = packages.map(pack => pack.id);
    const selectQuery = mysql.format('SELECT * FROM tblsettings WHERE id IN (?)', [packageIds]);
    const [rows] = await connection.execute(selectQuery);

    return {
      success: true,
      updatedData: rows[0]
    };
  } catch (error) {
    // await connection.rollback();
    console.error('Error in insertAllpackage:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

function changeDateFormat(originalDate) {

  // Create a new Date object from the string
  const dateObj = new Date(originalDate);

  // Extract the parts of the date (YYYY-MM-DD) and time (HH:MM:SS)
  const formattedDate = dateObj.toISOString().slice(0, 10); // Get 'YYYY-MM-DD'
  const formattedTime = dateObj.toTimeString().slice(0, 8); // Get 'HH:MM:SS'

  // Combine them together
  const newDate = `${formattedDate} ${formattedTime}`;

  return newDate
}

module.exports = {
  getAllpackage,
  insertAllpackage
};
