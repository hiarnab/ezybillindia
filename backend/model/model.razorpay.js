const mysql = require('mysql2/promise');
const db = require('../lib/db');

function getFormattedDateWithOffset(days, startDate) {
  const date = new Date(startDate);
  date.setDate(date.getDate() + days);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

// async function insertPayment(record) {
//   const connection = await db();
//   try {
//     const query = 'INSERT INTO tbltransaction (cus_id, amount, transaction_number, payment_method, gateway_txn_id, Rnn, created_by, Json_response) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
//     const json = JSON.stringify(record);
//     const values = [record.notes.cus_id, record.amount / 100, record.order_id, record.method, record.id, record.acquirer_data.rrn, record.notes.cus_id, json];
//     const result = await connection.query(query, values);
//     let cust_no = record.notes.cus_id;
//     let Property_query = `SELECT * FROM tblmasterproperty WHERE CustomerNo = ?`;
//     const [rows] = await connection.query(Property_query, [cust_no]);
//     if (rows.length > 0) {
//       // console.log(rows)
//       let package_paln = `SELECT * FROM tblpackageplan WHERE property_id = ? ORDER BY created_at DESC LIMIT 1`;
//       const [plan] = await connection.query(package_paln, [rows[0].PropertyNo]);
//       // console.log(plan)
//       if (plan.length > 0) {
//         if (plan[0].type === 'free' && record.status === "captured") {
//           const new_packg = `INSERT INTO tblpackageplan (property_id, type, amount, start_date, expired_at, is_active, days, plan_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
//           const date = new Date();
//           const day = String(date.getDate()).padStart(2, '0');
//           const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
//           const year = date.getFullYear();
//           const fulldate = `${year}-${month}-${day}`;
//           // const [rows] = await connection.query('SELECT * FROM tblsettings');
//           // const setting = rows[0];
//           const freeDays = parseInt(record.notes.days, 10);
//           const expDate = await getFormattedDateWithOffset(freeDays);
//           const type = null;
//           if (freeDays == 30) {
//             type = "monthly";
//           } else if (freeDays == 120) {
//             type = "quaterly"
//           }else if (freeDays == 180) {
//             type = "half-yearly"
//           }else {
//             type = "yearly"
//           }
//           const pak_value = [plan[0].property_id, "paid", record.amount / 100, fulldate, expDate, "active", record.notes.days, type];
//           const [ins_result] = await connection.query(new_packg, pak_value);
//           if (ins_result.affectedRows > 0) {
//             const update_query = `UPDATE tblpackageplan SET is_active = NULL WHERE property_id = ? AND id = ?`;
//             await connection.query(update_query, [plan[0].property_id, plan[0].id]);
//             // console.log('Update query successfully run after insert');
//           }
//         }
//         // if (plan[0].)
//       }
//     }
//   } catch (error) {
//     console.error('Error inserting or updating package plan:', error);
//   }

// }

async function insertPayment(record) {
  const connection = await db();
  try {
    const custNo = record.notes.cus_id;
    const planId = record.notes.id;
    const propertyNo = record.notes.PropertyNo;
    const json = JSON.stringify(record);
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    const fulldate = `${year}-${month}-${day}`;
    const transactionQuery = 'INSERT INTO tbltransaction (package_master_id, property_id, amount, status, transaction_no, payment_method, gateway_txn, rnn, json_response, created_by) VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const transactionValue = [
      planId,
      propertyNo,
      record.amount / 100,
      record.status,
      record.order_id,
      record.method,
      record.id,
      record.acquirer_data.rrn,
      json,
      custNo
    ];
    const insertResult = await connection.query(transactionQuery, transactionValue);
    if (insertResult[0].affectedRows > 0) {
      const existingPackage = 'SELECT * FROM tblpackageplan WHERE property_id = ? AND is_active = ? ORDER BY created_at DESC LIMIT 1';
      const packageResult = await connection.query(existingPackage, [propertyNo, 'active']);
      const freeDays = parseInt(record.notes.days, 10);
      let startDate;
      let expireDate;
      let newPackageResult;
      if (packageResult.length > 0 && new Date(packageResult[0][0].expired_at) > new Date()) {
        startDate = packageResult[0][0].start_date;
        expireDate = await getFormattedDateWithOffset(freeDays, packageResult[0][0].expired_at);
      } else {
        startDate = fulldate;
        expireDate = await getFormattedDateWithOffset(freeDays, fulldate);
      }
      if (record.status === 'captured') {
        const newPackage = 'INSERT INTO tblpackageplan (package_master_id, property_id, amount_without_tax, bank_transaction_id, order_status, start_date, expired_at, is_active, created_by) VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const packageValue = [
          planId,
          propertyNo,
          record.amount / 100,
          insertResult[0].insertId,
          'complete',
          startDate,
          expireDate,
          'active',
          custNo
        ];
        newPackageResult = await connection.query(newPackage, packageValue);
        if (newPackageResult[0].affectedRows > 0 && packageResult.length > 0) {
          const updatePackage = 'UPDATE tblpackageplan SET is_active = ? WHERE id = ?';
          await connection.query(updatePackage, ['', packageResult[0][0].id]);
        }
      } else if (record.status === 'pending') {
        const newPackage = 'INSERT INTO tblpackageplan (package_master_id, property_id, amount_without_tax, bank_transaction_id, order_status, start_date, expired_at, created_by) VALUE (?, ?, ?, ?, ?, ?, ?, ?)';
        const packageValue = [
          planId,
          propertyNo,
          record.amount / 100,
          insertResult[0].insertId,
          'pending',
          startDate,
          expireDate,
          custNo
        ];
        newPackageResult = await connection.query(newPackage, packageValue);
      } else {
        const newPackage = 'INSERT INTO tblpackageplan (package_master_id, property_id, amount_without_tax, bank_transaction_id, order_status, start_date, expired_at, created_by) VALUE (?, ?, ?, ?, ?, ?, ?, ?)';
        const packageValue = [
          planId,
          propertyNo,
          record.amount / 100,
          insertResult[0].insertId,
          'canceled',
          startDate,
          expireDate,
          custNo
        ];
        newPackageResult = await connection.query(newPackage, packageValue);
      }

      if (newPackageResult[0].affectedRows > 0) {
        const updateTransaction = 'UPDATE tbltransaction SET package_id = ? WHERE id = ?';
        await connection.query(updateTransaction, [newPackageResult[0].insertId, insertResult[0].insertId]);
      }
    }
  }
  catch (error) {
    console.error('Error inserting or updating package plan:', error);
  }
}

async function custDetails(data) {
  const connection = await db();
  try {
    const query = 'SELECT * FROM tblmastercustomer WHERE CustomerNo = ?';
    const [result] = await connection.query(query, [data]);
    return result;
  } catch (error) {
    console.error('Error to fetch user data:', error);
  }
}

module.exports = {
  insertPayment,
  custDetails
};
