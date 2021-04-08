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

router.get("/:idkriteria/sub", requireLoggin, (req, res) => {
  const { idkriteria } = req.params;
  let query = `SELECT subkriteria.id_subkriteria, subkriteria.nama, kriteria.nama AS nama_kriteria, kriteria.kode as kode_kriteria, subkriteria.bobot FROM subkriteria INNER JOIN kriteria ON subkriteria.id_kriteria=kriteria.id_kriteria WHERE subkriteria.id_kriteria = ${idkriteria} ORDER BY bobot DESC`;
  // let query = `SELECT subkriteria.nama, subkriteria.bobot FROM subkriteria WHERE subkriteria.id_kriteria = ${idkriteria}`;
  db.query(query, function (err, result, fields) {
    if (err) {
      res.redirect('/subkriteria');
    } else {
      // console.log("sub Result", result);
      // console.log("id Kriteria:", idkriteria);
      res.render("subkriteria/sub", { subkriterias: result, idkriteria });
    }
  });
});

// New route
router.post("/:idkriteria/sub/new", requireLoggin, (req, res) => {
  const subkriteriaBaru = req.body.subkriteria;
  const { idkriteria } = req.params;
  let sql = `INSERT INTO subkriteria (id_kriteria, nama, bobot) VALUES ('${idkriteria}', '${subkriteriaBaru.nama}', '${subkriteriaBaru.bobot}')`;
  db.query(sql, function (err, result) {
    if (err) {
      req.flash('error', 'Gagal menambahkan data'); //adding informatin to a session
      res.redirect(`/subkriteria/${idkriteria}/sub`);
    } else {
      req.flash('success', 'Berhasil menambahkan data'); //adding informatin to a session
      res.redirect(`/subkriteria/${idkriteria}/sub`);
    }
  });
});


//Edit Route
router.get("/:idkriteria/:idsub/edit", requireLoggin, (req, res) => {
  const { idkriteria, idsub } = req.params;
  db.query(`SELECT * FROM subkriteria WHERE id_subkriteria = ${idsub}`, function (err, result) {
    if (err) {
      res.redirect(`/subkriteria/${idkriteria}/sub`);
    } else {
      res.render("subkriteria/editsub", { subkriterias: result, idkriteria, idsub });
    }
  });
});

//Update route
router.put("/:idkriteria/:idsub", requireLoggin, (req, res) => {
  const { idkriteria, idsub } = req.params;
  // const { idsub } = req.params;
  const { nama, bobot } = req.body.subkriteria;
  let sql = `UPDATE subkriteria SET nama = '${nama}', bobot = '${bobot}' WHERE id_subkriteria = '${idsub}'`;
  db.query(sql, function (err, result) {
    if (err) {
      console.log("INI EROR: ", err);
      req.flash('error', 'Update data gagal'); //adding informatin to a session
      res.redirect(`/subkriteria/${idkriteria}/sub`);
    } else {
      req.flash('success', 'Berhasil update data sub kriteria'); //adding informatin to a session
      res.redirect(`/subkriteria/${idkriteria}/sub`);
    }
  });
});


//Delete Route
router.delete("/:idkriteria/:idsub", requireLoggin, (req, res) => {
  const { idkriteria, idsub } = req.params;
  // let sql = `DELETE FROM kriteria WHERE (id_kriteria = '${req.params.id}')`;
  let sql = `DELETE FROM subkriteria WHERE id_subkriteria = ${idsub}`;
  db.query(sql, function (err, result) {
    if (err) {
      req.flash('error', 'Gagal menghapus data'); //adding informatin to a session
      console.log(err);
      res.redirect(`/subkriteria/${idkriteria}/sub`);
    } else {
      req.flash('success', 'Berhasil menghapus sub kriteria'); //adding informatin to a session
      res.redirect(`/subkriteria/${idkriteria}/sub`);
    }
  });
});

module.exports = router;