const { packagePlan } = require('./createPackage_plan');
const { createSetting } = require('./createSetting');
const { createNotification } = require('./createNotification');
const { Transaction } = require('./Transaction');
const db = require('../lib/db');

async function runPackageplan() {
  const connection = await db();
  try {
    await packagePlan();
    await createSetting();
    await createNotification();
    await Transaction();
  }
  catch (error) {
    console.error('Error running migration:', error);
  }
  finally {
    await connection.end(); // Ensure the connection is closed
  }
}

runPackageplan();
