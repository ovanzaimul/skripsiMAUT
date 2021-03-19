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

router.get("/", requireLoggin, (req, res) => {
  db.query("SELECT * FROM kriteria", function (err, result, fields) {
    if (err) {
      res.redirect('/dashboard');
    } else {
      res.render("subkriteria/index", { kriterias: result });
    }
  });
});

// let query = `SELECT subkriteria.*, kriteria.kode AS kode_kriteria, kriteria.nama AS nama_kriteria FROM subkriteria, kriteria WHERE subkriteria.id_kriteria = kriteria.id_kriteria`;

router.get("/:idkriteria/sub", requireLoggin, (req, res) => {
  let query = `SELECT subkriteria.*, kriteria.kode AS kode_kriteria, kriteria.nama AS nama_kriteria FROM subkriteria, kriteria WHERE subkriteria.id_kriteria = kriteria.id_kriteria`;
  db.query(query, function (err, result, fields) {
    if (err) {
      res.redirect('/subkriteria');
    } else {
      console.log("sub Result", result);
      res.render("subkriteria/sub", { subkriterias: result });
    }
  });
});

router.get("/new", requireLoggin, (req, res) => {
  res.render("kriteria/new");
});

router.post("/", requireLoggin, (req, res) => {
  const subkriteriaBaru = req.body.subkriteria;
  // console.log(req.body.kriteria);
  let sql = `INSERT INTO subkriteria (kode, nama, bobot) VALUES
   ( '${kriteriaBaru.kode}', '${kriteriaBaru.nama}', '${kriteriaBaru.bobot / 100}')`;
  db.query(sql, function (err, result) {
    if (err) {
      req.flash('error', 'Gagal menambahkan data'); //adding informatin to a session
      res.redirect(`/kriteria`);
    } else {
      req.flash('success', 'Berhasil menambahkan kriteria baru'); //adding informatin to a session

      res.redirect(`/kriteria`);
    }
  });
});


//Edit Route
router.get("/:id/edit", requireLoggin, (req, res) => {
  db.query(`SELECT * FROM kriteria WHERE id_kriteria = '${req.params.id}'`, function (err, result) {
    if (err) {
      res.redirect("/kriteria");
    } else {
      console.log("FOUND RESULT", result);
      res.render("kriteria/edit", { kriterias: result });
    }
  });
});

//Update route
router.put("/:id", requireLoggin, (req, res) => {
  const { id } = req.params;
  const { kode, nama, bobot } = req.body.kriteria;
  let sql = `UPDATE kriteria SET kode = '${kode}', nama = '${nama}', bobot = '${bobot / 100}'  WHERE id_kriteria = '${id}'`;
  db.query(sql, function (err, result) {
    if (err) {
      req.flash('error', 'Update data gagal'); //adding informatin to a session
      res.redirect(`/kriteria`);
    } else {
      req.flash('success', 'Berhasil update data kriteria'); //adding informatin to a session
      res.redirect(`/kriteria`);
    }
  });
});


//Delete Route
router.delete("/:id", requireLoggin, (req, res) => {
  const sql = `DELETE FROM kriteria WHERE (id_kriteria = '${req.params.id}')`;
  db.query(sql, function (err, result) {
    if (err) {
      req.flash('error', 'Gagal menghapus data'); //adding informatin to a session
      console.log(err);
      res.redirect("/kriteria");
    } else {
      req.flash('success', 'Berhasil menghapus kriteria'); //adding informatin to a session
      res.redirect("/kriteria");
    }
  });
});

module.exports = router;