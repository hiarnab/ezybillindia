const express = require('express');
var cors = require('cors');
require('dotenv').config();
const path = require('path');
const routes = require('./routes/index');
const mysql = require('mysql');

const app = express();
app.use(cors());
// if (process.env.NODE_ENV !== 'production') {

// }
app.use(express.json());

const db = mysql.createPool({
  connectionLimit: 10, // or higher based on your application needs
  host: "localhost",
  user: "root",
  password: "",
  database: "ebilldb"
});
//******************************* This is for package plan api***************************************
app.post('/package', (req, res) => {
  const sql = "INSERT INTO tblpackageplan (property_id, type, amount, taxable_amount, tax, start_date, expired_at, created_at, updated_at, deleted_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  const values = [
      req.body.property_id,
      req.body.type,
      req.body.amount,
      req.body.taxable_amount,
      req.body.tax,
      req.body.start_date,
      req.body.expired_at,
      req.body.created_at,
      req.body.created_at,
      req.body.updated_at,
      req.body.deleted_at
  ];

  db.query(sql, values, (err, result) => {
      if (err) {
          console.error("Database error:", err.message);
          return res.status(500).json({ error: 'Database error' });
      }
      // Assuming you want to send back the inserted data or a success message
      return res.json({ message: 'Package plan added successfully!', data: result });
  });
});
//******************************* End package plan api*************************************************************************

// ******************************This is For Setting api************************************************************************
app.post('/api/setting',(req, res)=>{
  const sql = "INSERT INTO tblsettings (`key`, `value`) VALUES (?, ?)";
  const values = [
    req.body.key,
    req.body.value
  ];
  db.query( sql, values,(err, result)=>{
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ error: 'Database error' });
  }
  return res.json({ message: 'Setting added successfully!', data: result });
  });
});
// **************************this is for update api********************************
app.post('/setting/update/:id', (req, res) => {
  const sql =  `
  UPDATE tblsettings 
  SET \`key\` = ?,
      \`value\` = ?
  WHERE id = ?
`;
  const values = [
    req.body.key,
    req.body.value,
    req.params.id
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ error: 'Database error' });
    }
    return res.json({ message: 'Setting added or updated successfully!', data: result });
  });
});

//******************************End Setting api************************************************************************






app.use(express.urlencoded({ extended: true }));
app.listen(process.env.NODE_PORT || 4000, () => {
  // eslint-disable-next-line
  console.log('Server is running on port ', process.env.NODE_PORT || 4000);
});
app.use('/api', routes);

app.use('/assets', express.static(path.join(__dirname, 'public')));