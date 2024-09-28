const mysql = require('mysql2/promise');
const db = require('../lib/db');

async function createNotification() {
  const connection = await db();
  const now = new Date();
  const pad = (n) => (n < 10 ? `0${n}` : n);
  const migrationIdentifier = 'create_tblnotification_table';
  const formattedDate = `${now.getFullYear()}_${pad(now.getMonth() + 1)}_${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}_${migrationIdentifier}`;
  const batchNumber = 1;

  const checkTableQuery = `
    SELECT COUNT(*) AS count
    FROM information_schema.tables 
    WHERE table_schema = DATABASE() AND table_name = 'tblnotification';
  `;

  try {
    const [rows] = await connection.query(checkTableQuery);
    if (rows[0].count > 0) {
      console.log('tblnotification table already exists. Skipping migration.');
      return;
    }

    const createTableQuery = `
      CREATE TABLE tblnotification (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cus_id BIGINT,
    FOREIGN KEY (cus_id) REFERENCES tblmastercustomer(CustomerNo),
    is_sent ENUM('yes', 'no') NOT NULL DEFAULT 'yes',
    is_receive ENUM('yes', 'no') NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL
  );
    `;

    await connection.query(createTableQuery);

    const insertMigrationQuery = `
      INSERT INTO migrations (migration, batch)
      VALUES (?, ?);
    `;
    await connection.query(insertMigrationQuery, [formattedDate, batchNumber]);

    console.log('tblnotification table created and migration entry inserted.');
  }
  catch (error) {
    console.error('Error running migration:', error);
  }
}

module.exports = {
  createNotification
};
