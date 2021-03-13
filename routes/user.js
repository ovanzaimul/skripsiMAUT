const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const bcrypt = require('bcrypt');


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


router.get('/register', (req, res) => {
  res.render("user/register");
});

router.post('/register', async (req, res) => {
  const { password, username } = req.body;
  const hash = await bcrypt.hash(password, 12);

  let sql = `INSERT INTO user (username, password) VALUES
   ( '${username}', '${hash}')`;
  db.query(sql, function (err, result) {
    if (err) {
      console.log(err)
      req.flash('error', 'Gagal menambahkan user'); //adding informatin to a session
      res.redirect(`/karyawan`);
    } else {
      req.flash('success', 'Berhasil menambahkan user'); //adding informatin to a session
      req.session.currentUser = username;
      res.redirect(`/karyawan`);
    }
  });
});

router.get("/login", (req, res) => {
  res.render('user/login')
});

router.post("/login", async (req, res) => {
  const { password, username } = req.body;
  db.query(`SELECT * FROM user WHERE username = '${username}'`, async (err, result) => {
    if (err) {
      res.redirect("/login");
    } else {
      const validPassword = await bcrypt.compare(password, result[0].password);
      if (validPassword) {
        req.session.currentUser = username;
        req.flash('success', `Berhasil login, Selamat datang kembali, ${req.session.currentUser}`); //adding informatin to a session
        res.redirect("/karyawan")
      } else {
        req.flash('error', 'Gagal login, Username atau password incorrect!');
        res.redirect("/login")
      }
    }
  });
});

router.post("/logout", (req, res) => {
  req.session.currentUser = null; //stop tracking the currentUser
  req.flash('success', 'Good Bye');
  res.redirect('/login');
});

module.exports = router;