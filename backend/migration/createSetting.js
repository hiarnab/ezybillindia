const mysql = require('mysql2/promise');
const db = require('../lib/db');

async function createSetting() {
  const connection = await db();
  const now = new Date();
  const pad = (n) => (n < 10 ? `0${n}` : n);
  const migrationIdentifier = 'create_tblsettings_table';
  const formattedDate = `${now.getFullYear()}_${pad(now.getMonth() + 1)}_${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}_${migrationIdentifier}`;
  const batchNumber = 1;

  const checkTableQuery = `
    SELECT COUNT(*) AS count
    FROM information_schema.tables 
    WHERE table_schema = DATABASE() AND table_name = 'tblsettings';
  `;

  try {
    const [rows] = await connection.query(checkTableQuery);
    if (rows[0].count > 0) {
      console.log('tblsettings table already exists. Skipping migration.');
      return;
    }

    const createTableQuery = `
        CREATE TABLE tblsettings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        free VARCHAR(255) NULL,
        annual_disc INT(11) NULL,
        base_cost INT(11) NULL,
        quater_disc INT(11) NULL,
        half_disc INT(11) NULL
        )
        `;

    await connection.query(createTableQuery);

    const insertMigrationQuery = `
      INSERT INTO migrations (migration, batch)
      VALUES (?, ?);
    `;
    await connection.query(insertMigrationQuery, [formattedDate, batchNumber]);
    console.log('tblsettings table created and migration entry inserted.');
  }
  catch (error) {
    console.error('Error running migration:', error);
  }
}

module.exports = {
  createSetting
};
