const mysql = require('mysql2/promise');
const db = require('../../lib/db');

// async function lifetimefree(PropertyNo) {
//   const date = new Date();
//   const day = String(date.getDate()).padStart(2, '0');
//   const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
//   const year = date.getFullYear();
//   const fulldate = `${year}-${month}-${day}`;

//   const connection = await db();
//   const getLifeTimeFreeQuery = 'SELECT * FROM tblsettings WHERE type = ?';
//   const [settingResults] = await connection.query(getLifeTimeFreeQuery, ['life_time_free']);

//   const query = 'SELECT * FROM tblpackageplan WHERE is_active = ? AND property_id = ?';
//   const [queryresult] = await connection.query(query, ['active', PropertyNo]);

//   if (queryresult.length > 0) {
//     try {
//       const updateQuery = 'UPDATE tblpackageplan SET expired_at = NULL, is_active = NULL WHERE id = ?';
//       await connection.query(updateQuery, [queryresult[0].id]);
//     }
//     catch (error) {
//       console.error(error);
//     }
//   }
//   const value = {
//     package_master_id: settingResults[0].id,
//     property_id: PropertyNo,
//     amount_without_tax: settingResults[0].amount,
//     order_status: 'complete',
//     start_date: fulldate,
//     expired_at: null,
//     is_active: 'active'
//   };

//   const squery = `
//   INSERT INTO tblpackageplan (package_master_id, property_id, amount_without_tax, order_status, start_date, expired_at, is_active) VALUES(?, ?, ?, ?, ?, ?, ?)`;
//   const result = await connection.execute(squery, [
//     value.package_master_id,
//     value.property_id,
//     value.amount_without_tax,
//     value.order_status,
//     value.start_date,
//     value.expired_at,
//     value.is_active
//   ]);
//   return result;
// }

async function lifetimefree(PropertyNo) {
  try {
    const connection = await db();
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    const fulldate = `${year}-${month}-${day}`;

    const previousDate = new Date(date);
    previousDate.setDate(previousDate.getDate() - 1);
    const prevDay = String(previousDate.getDate()).padStart(2, '0');
    const prevMonth = String(previousDate.getMonth() + 1).padStart(2, '0');
    const prevYear = previousDate.getFullYear();
    const prevDateFormatted = `${prevYear}-${prevMonth}-${prevDay}`;

    const setting = 'SELECT * FROM tblsettings WHERE title = ?';
    const [settingResult] = await connection.query(setting, ['life_time_free']);
    if (settingResult.length > 0) {
      const existPackage = 'SELECT * FROM tblpackageplan WHERE property_id = ? AND package_master_id = ? AND expired_at IS NULL';
      const [packageResult] = await connection.query(existPackage, [PropertyNo, settingResult[0].id, null]);
      if (packageResult.length > 0) {
        const updatePackage = 'UPDATE tblpackageplan SET expired_at = ? WHERE id = ?';
        await connection.query(updatePackage, [prevDateFormatted, packageResult[0].id]);
      } else {
        const packagee = 'SELECT * FROM tblpackageplan WHERE property_id = ? AND is_active = ?';
        const [packageeResult] = await connection.query(packagee, [PropertyNo, 'active']);
        const newPackage = 'INSERT INTO tblpackageplan (package_master_id, property_id, amount_without_tax, start_date, is_active) VALUE (?, ?, ?, ?, ?)';
        const packageValue = [
          settingResult[0].id,
          PropertyNo,
          '0',
          fulldate,
          'active'
        ];
        const newPackageResult = await connection.query(newPackage, packageValue);
        if (newPackageResult[0].affectedRows > 0 && packageeResult.length > 0) {
          const updatePackage = 'UPDATE tblpackageplan SET is_active = ? WHERE id = ?';
          await connection.query(updatePackage, ['', packageeResult[0].id]);
        }
      }
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

module.exports = {
  lifetimefree
};
