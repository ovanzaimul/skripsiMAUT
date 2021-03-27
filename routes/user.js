const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const bcrypt = require('bcrypt');
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

router.get('/register', (req, res) => {
  res.render("user/register");
});

router.post('/register', async (req, res) => {
  const { password, username, fullname } = req.body;
  const hash = await bcrypt.hash(password, 12);

  db.query(`SELECT * FROM user WHERE username = '${username}'`, async (err, result) => {
    if (result.length !== 0) {
      req.flash('error', 'Username telah terdaftar'); //adding informatin to a session
      res.redirect(`/user`);
    } else {
      let sql = `INSERT INTO user (fullname, username, password) VALUES
   ('${fullname}' ,'${username}', '${hash}')`;
      db.query(sql, async function (err, result) {
        if (err) {
          console.log(err);
          req.flash('error', 'Gagal menambahkan user'); //adding informatin to a session
          res.redirect(`/user`);
        } else {
          req.flash('success', 'Berhasil menambahkan user'); //adding informatin to a session
          req.session.currentUser = username;
          res.redirect(`/user`);
        }
      });
    }
  });
});

router.get("/login", (req, res) => {
  res.render('user/login')
});

router.post("/login", async (req, res) => {
  // console.log(req.body);
  const { password, username } = req.body;
  db.query(`SELECT * FROM user WHERE username = '${username}'`, async (err, result) => {
    if (err) {
      console.log("ini eror : ", err);
      res.redirect("/login");
    } else {
      if (!result || result.length !== 0) {
        const validPassword = await bcrypt.compare(password, result[0].password);
        if (validPassword) {
          req.session.currentUser = username;
          req.flash('success', `Berhasil login, Selamat datang kembali, ${req.session.currentUser}`); //adding informatin to a session
          res.redirect("/dashboard")
        } else {
          req.flash('error', 'Gagal login, Username atau password salah!');
          res.redirect("/login")
        }
      } else {
        // req.flash('error', 'Username belum terdaftar');
        req.flash('error', 'Gagal login, Username atau password salah!');
        res.redirect("/login")
      }
    }
  });
});

router.get("/user", requireLoggin, (req, res) => {
  db.query(`SELECT * FROM user`, async (err, result) => {
    if (err) {
      res.redirect("/login");
    } else {
      res.render("user/index", { users: result });
    }
  });
});


//Edit Route
router.get("/user/:id/edit", requireLoggin, (req, res) => {
  db.query(`SELECT * FROM user WHERE id_user = '${req.params.id}'`, function (err, result) {
    if (err) {
      res.redirect("/user");
    } else {
      console.log(result)
      res.render("user/edit", { users: result });
    }
  });
});

//Update route
router.put("/user/:id", requireLoggin, async (req, res) => {
  const { id } = req.params;
  const { username, fullname, password } = req.body.user;
  console.log("password from edit form: ", req.body.user.password);
  if (password) {
    const hash = await bcrypt.hash(password, 12);
    let sql = `UPDATE user SET username = '${username}', fullname = '${fullname}', password = '${hash}' WHERE id_user = '${id}'`;
    db.query(sql, function (err, result) {
      if (err) {
        req.flash('error', 'Update data gagal'); //adding informatin to a session
        res.redirect(`/user`);
      } else {
        req.flash('success', 'Berhasil update data user'); //adding informatin to a session
        res.redirect(`/user`);
      }
    });
  } else {
    let sql = `UPDATE user SET username = '${username}', fullname = '${fullname}' WHERE id_user = '${id}'`;
    db.query(sql, function (err, result) {
      if (err) {
        req.flash('error', 'Update data gagal'); //adding informatin to a session
        res.redirect(`/user`);
      } else {
        req.flash('success', 'Berhasil update data user'); //adding informatin to a session
        res.redirect(`/user`);
      }
    });
  }
});


//Delete Route
router.delete("/user/:id", requireLoggin, (req, res) => {
  const sql = `DELETE FROM user WHERE (id_user = '${req.params.id}')`;
  db.query(sql, function (err, result) {
    if (err) {
      req.flash('error', 'Gagal menghapus data'); //adding informatin to a session
      console.log(err);
      res.redirect("/user");
    } else {
      req.flash('success', 'Berhasil menghapus user'); //adding informatin to a session
      res.redirect("/user");
    }
  });
});

router.get("/logout", (req, res) => {
  req.session.currentUser = null; //stop tracking the currentUser
  req.flash('success', 'Goodbye');
  res.redirect('/login');
});

module.exports = router;