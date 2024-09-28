const mysql = require('mysql2/promise');
const db = require('../lib/db');

async function getPayment(cus_id) {
  try {
    const connection = await db();

    // Query to get all properties for the customer
    const propertyQuery = mysql.format(
      'SELECT mp.PropertyNo, mp.PropName, c.CustomerName FROM tblmasterproperty mp JOIN tblmastercustomer c ON mp.CustomerNo = c.CustomerNo WHERE mp.CustomerNo = ?',
      [cus_id]
    );
    const [properties] = await connection.query(propertyQuery);

    if (properties.length === 0) {
      throw new Error('No properties found for the customer.');
    }

    // Collect payment details for all properties
    let allPaymentDetails = [];

    for (const property of properties) {
      const { PropertyNo, PropName, CustomerName } = property;

      // Query to get the payment details for each property
      const paymentQuery = mysql.format('SELECT * FROM tbltransaction WHERE property_id = ?', [PropertyNo]);
      const [payments] = await connection.query(paymentQuery);

      // Append the property and customer information to each payment record
      const paymentDetails = payments.map(payment => ({
        ...payment,
        PropName,
        CustomerName
      }));

      // Collect the payment details for this property
      allPaymentDetails = allPaymentDetails.concat(paymentDetails);
    }

    return allPaymentDetails;
  } catch (error) {
    console.error('Error fetching payment details:', error);
    throw error;
  }
}

module.exports = { getPayment };
