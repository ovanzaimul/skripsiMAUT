const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'skripsidb'
});

db.connect((err) => {
  if (!err) {
    console.log("middleware CONNECTED");
  } else {
    console.log("CONNECTION FAILED", err);
  }
});

module.exports = db;