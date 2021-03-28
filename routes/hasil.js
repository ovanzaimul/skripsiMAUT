const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const { requireLoggin } = require('../middleware');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'skripsidb'
});

db.connect((err) => {
  if (!err) {
    console.log("MYSQL CONNECTED");
  } else {
    console.log("CONNECTION FAILED", err);
  }
});


router.get("/", (req, res) => {
  db.query("SELECT * FROM penilaian", function (err, result, fields) {
    if (err) {
      res.redirect('/dashboard');
    } else {
      res.render('hasil/index')
    }
  });
});

module.exports = router;