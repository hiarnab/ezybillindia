const mysql = require('mysql2/promise');
const db = require('../lib/db');

async function insert(channel, otp) {
  const connection = await db();
  const query = mysql.format('INSERT INTO tblotp (channel, otp) VALUES(?, ?)', [channel, otp]);
  await connection.query(query);
  return true;
}

async function getOTPByChannel(channel, validity) {
  const connection = await db();
  const query = mysql.format('SELECT otp FROM tblotp WHERE channel=? AND created > current_timestamp - interval ? minute', [channel, validity]);
  const result = await connection.query(query);
  return result[0];
}

module.exports = {
  insert,
  getOTPByChannel
};
