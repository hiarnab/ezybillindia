const mysql = require('mysql2/promise');
const db = require('../../lib/db');

async function getAllProperty() {
  const connection = await db();
  const query = mysql.format('SELECT tblmasterproperty.*, tblmasterproperty.isActive AS propertyIsActive, tblmastercustomer.*, tblmastercustomer.isActive AS customerIsActive, tblpackageplan.*, tblsettings.* FROM tblmasterproperty INNER JOIN tblmastercustomer ON tblmasterproperty.CustomerNo = tblmastercustomer.CustomerNo LEFT JOIN tblpackageplan ON tblmasterproperty.PropertyNo = tblpackageplan.property_id INNER JOIN tblsettings ON tblpackageplan.package_master_id = tblsettings.id WHERE tblpackageplan.is_active = "active";');
  const result = await connection.query(query);
  // console.log(result);
  return result[0];
}

async function propertyDetails(PropertyNo) {
  const connection = await db();
  const query = mysql.format(`
    SELECT 
      tblmasterproperty.*, 
      tblmastercustomer.*, 
      latest_packageplan.*,
       tblpackageplan.*,
       tblsettings.*
    FROM 
      tblmasterproperty
    INNER JOIN 
      (
        SELECT * 
        FROM tblpackageplan 
        WHERE property_id = ? 
        ORDER BY created_at DESC LIMIT 1
      ) AS latest_packageplan 
    ON 
      tblmasterproperty.PropertyNo = latest_packageplan.property_id
    INNER JOIN 
      tblmastercustomer 
    ON 
      tblmasterproperty.CustomerNo = tblmastercustomer.CustomerNo
    INNER JOIN
       tblpackageplan 
    ON 
       tblmasterproperty.PropertyNo = tblpackageplan.property_id
     INNER JOIN
       tblsettings 
    ON 
       tblpackageplan.package_master_id = tblsettings.id
    WHERE 
         tblmasterproperty.PropertyNo = ?
  `, [PropertyNo, PropertyNo]);
  // const query = mysql.format('select * from tblpackageplan where property_id=?', PropertyNo);
  const result = await connection.query(query);
  return result[0];
}

async function updateProperty(property, id) {
  try {
    const connection = await db();
    const updateQuery = mysql.format('UPDATE tblmasterproperty SET ? WHERE PropertyNo = ?', [property, id]);
    console.log(updateQuery);
    const [result] = await connection.execute(updateQuery);

    return {
      success: true,
      result
    };
  }
  catch (error) {
    console.error('Error in UPDATE PROPERTY:', error);
    return {
      success: false,
      error: error.message
    };
  }
  // finally {
  //   if (connection && connection.end) {
  //     connection.end(); // Make sure to close the connection
  //   }
  // }
}

module.exports = {
  getAllProperty,
  updateProperty,
  propertyDetails
};
