const express = require('express');
const mysql = require('mysql');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const ejsMate = require('ejs-mate');

const karyawanRoutes = require('./routes/karyawan');
const { requireLoggin } = require('./middleware');
const userRoutes = require('./routes/user');
const kriteriaRoutes = require('./routes/kriteria');


const port = 5000;
const app = express();

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

const sessionOption = { //memory store(default)
  secret: 'thisisnotagoodsecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, //so the user don't stay logged in forever
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
};
app.use(session(sessionOption));
app.use(flash());

app.engine('ejs', ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
// app.set('views');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public'))); //we can serve multiple directory but common just one


app.use((req, res, next) => { //add on to res obj so that in every single template in every views will have access to messages 
  res.locals.currentUser = req.session.currentUser;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});


app.use('/', userRoutes);
app.use('/karyawan', karyawanRoutes);
app.use('/kriteria', kriteriaRoutes);

app.get('/', requireLoggin, (req, res) => {
  res.redirect('/karyawan');
});
app.get('/dashboard', requireLoggin, (req, res) => {
  res.render('layouts/menuDashboard');
});



module.exports = requireLoggin;

app.listen(port, () => {
  console.log("Server runs at port", port);
});


