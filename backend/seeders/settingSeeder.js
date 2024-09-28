const mysql = require('mysql2/promise');
const db = require('../lib/db');

const settingSeed = async () => {
  try {
    const connection = await db();
    const setting = {
      free: '90',
      annual_disc: 25,
      base_cost: 1000,
      quater_disc: 15,
      half_disc: 20
    };

    const insertQuery = `
  INSERT INTO tblsettings (free, annual_disc, base_cost, half_disc, quater_disc) VALUES (?,?,?,?,?)`;

    await connection.execute(insertQuery, [
      setting.free,
      setting.annual_disc,
      setting.base_cost,
      setting.half_disc,
      setting.quater_disc
    ]);
    console.log('Setting seeded successfully.');
    await connection.end();
  }
  catch (error) {
    console.error('Error seeding setting:', error);
  }
};

settingSeed();
