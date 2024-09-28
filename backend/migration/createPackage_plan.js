const mysql = require('mysql2/promise');
const db = require('../lib/db');

async function packagePlan() {
  const connection = await db();
  const now = new Date();
  const pad = (n) => (n < 10 ? `0${n}` : n);
  const migrationIdentifier = 'create_tblpackageplan_table';
  const formattedDate = `${now.getFullYear()}_${pad(now.getMonth() + 1)}_${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}_${migrationIdentifier}`;
  const batchNumber = 1;

  const checkTableQuery = `
    SELECT COUNT(*) AS count
    FROM information_schema.tables 
    WHERE table_schema = DATABASE() AND table_name = 'tblpackageplan';
  `;

  try {
    const [rows] = await connection.query(checkTableQuery);
    if (rows[0].count > 0) {
      console.log('tblpackageplan table already exists. Skipping migration.');
      return;
    }

    const createTableQuery = `
      CREATE TABLE tblpackageplan (
        id INT AUTO_INCREMENT PRIMARY KEY,
        property_id BIGINT,
        FOREIGN KEY (property_id) REFERENCES tblmasterproperty(PropertyNo),
        type ENUM('free', 'paid') NOT NULL,
        amount BOOLEAN DEFAULT 0,
        taxable_amount BOOLEAN,
        tax BOOLEAN DEFAULT NULL,
        start_date TIMESTAMP NOT NULL,
        expired_at TIMESTAMP NULL DEFAULT NULL,
        is_active VARCHAR DEFAULT NULL,
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

    console.log('tblpackageplan table created and migration entry inserted.');
  }
  catch (error) {
    console.error('Error running migration:', error);
  }
}

module.exports = {
  packagePlan
};
