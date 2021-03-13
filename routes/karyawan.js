const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const session = require('express-session');

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



router.get("/", requireLoggin, (req, res) => {
  if (req.query.nama) {
    db.query(`SELECT * FROM karyawan WHERE nama LIKE '%${req.query.nama}%'`, function (err, result, fields) {
      if (err) throw err;
      res.render("karyawan/index", { karyawans: result });
    });
  } else {
    db.query("SELECT * FROM karyawan", function (err, result, fields) {
      if (err) {
        res.redirect(`/karyawan`);
      } else {
        // console.log(req.session);
        res.render("karyawan/index", { karyawans: result });
      }
    });
  }
});

router.get("/new", requireLoggin, (req, res) => {
  res.render("karyawan/new");
});

router.post("/", requireLoggin, (req, res) => {
  const karyawanBaru = req.body.karyawan;
  // console.log(req.body.karyawan);
  let sql = `INSERT INTO karyawan (nama, jkel, alamat) VALUES
   ( '${karyawanBaru.nama}', '${karyawanBaru.jkel}', '${karyawanBaru.alamat}')`;
  db.query(sql, function (err, result) {
    if (err) {
      req.flash('error', 'Gagal menambahkan data'); //adding informatin to a session
      res.redirect(`/karyawan`);
    } else {
      req.flash('success', 'Berhasil menambahkan karyawan baru'); //adding informatin to a session

      res.redirect(`/karyawan`);
    }
  });
});


//Edit Route
router.get("/:id/edit", requireLoggin, (req, res) => {
  db.query(`SELECT * FROM karyawan WHERE id = '${req.params.id}'`, function (err, result) {
    if (err) {
      res.redirect("/karyawan");
    } else {
      console.log("FOUND RESULT", result);
      res.render("karyawan/edit", { karyawans: result });
    }
  });
});

//Update route
router.put("/:id", requireLoggin, (req, res) => {
  const { id } = req.params;
  const { nama, jkel, alamat } = req.body.karyawan;
  let sql = `UPDATE karyawan SET nama = '${nama}', jkel = '${jkel}', alamat = '${alamat}'  WHERE id = '${id}'`;
  db.query(sql, function (err, result) {
    if (err) {
      req.flash('error', 'Update data gagal'); //adding informatin to a session
      res.redirect(`/karyawan`);
    } else {
      req.flash('success', 'Berhasil update data karyawan'); //adding informatin to a session
      res.redirect(`/karyawan`);
    }
  });
});


//Delete Route
router.delete("/:id", requireLoggin, (req, res) => {
  const sql = `DELETE FROM karyawan WHERE (id = '${req.params.id}')`;
  db.query(sql, function (err, result) {
    if (err) {
      req.flash('error', 'Gagal menghapus data'); //adding informatin to a session
      console.log(err);
      res.redirect("/karyawan");
    } else {
      req.flash('success', 'Berhasil menghapus karyawan'); //adding informatin to a session
      res.redirect("/karyawan");
    }
  });
});

module.exports = router;