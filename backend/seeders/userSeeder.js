const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const dbConfig = require('../lib/db');

const seedUsers = async () => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('test@timd.com', salt);

  try {
    const connection = await dbConfig();
    const user = {
      fullName: 'Test Admin',
      email: 'test@timd.com',
      phone: '9062462268',
      password: hashedPassword
    };

    const insertQuery = `
        INSERT INTO tbluser (fullName, email, phone, password, created_at, updated_at)
        VALUES (?, ?, ?, ?, NOW(), NOW())
    `;

    await connection.execute(insertQuery, [
      user.fullName,
      user.email,
      user.phone,
      user.password
    ]);

    console.log('User seeded successfully.');
    await connection.end();
  }
  catch (error) {
    console.error('Error seeding user:', error);
  }
};

seedUsers();
