const mysql = require('mysql2/promise');
const db = require('../lib/db');

async function Transaction() {
    const connection = await db();
    const now = new Date();
    const pad = (n) => (n < 10 ? `0${n}` : n);
    const migrationIdentifier = 'create_tbltransaction_table';
    const formattedDate = `${now.getFullYear()}_${pad(now.getMonth() + 1)}_${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}_${migrationIdentifier}`;
    const batchNumber = 1;

    const checkTableQuery = `
      SELECT COUNT(*) AS count
      FROM information_schema.tables 
      WHERE table_schema = DATABASE() AND table_name = 'tbltransaction';
    `;

    try {
        const [rows] = await connection.query(checkTableQuery);
        if (rows[0].count > 0) {
            console.log('tbltransaction table already exists. Skipping migration.');
            return;
        }

        const createTableQuery = `
        CREATE TABLE tbltransaction (
        id INT AUTO_INCREMENT PRIMARY KEY,
        cus_id BIGINT,
        FOREIGN KEY (cus_id) REFERENCES tblmastercustomer(CustomerNo),
        Package_plan_id INT,
        FOREIGN KEY (Package_plan_id) REFERENCES tblpackageplan(id),
        amount BOOLEAN DEFAULT 0,
        transaction_number VARCHAR(255) NOT NULL,
        payment_method VARCHAR(255) NOT NULL,
        gateway_txn_id VARCHAR(255) NOT NULL,
        Rnn VARCHAR(255) NOT NULL,
        Json_response VARCHAR(255) NOT NULL,
        status ENUM('active', 'inactive') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        created_by VARCHAR(255) NOT NULL,
        deleted_at TIMESTAMP NULL DEFAULT NULL
         );      
      `;

        await connection.query(createTableQuery);

        const insertMigrationQuery = `
        INSERT INTO migrations (migration, batch)
        VALUES (?, ?);
      `;
        await connection.query(insertMigrationQuery, [formattedDate, batchNumber]);

        console.log('tbltransaction table created and migration entry inserted.');
    }
    catch (error) {
        console.error('Error running migration:', error);
    }
}


module.exports = {
    Transaction
};