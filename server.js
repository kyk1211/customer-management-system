const fs = require('fs');
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.databse
});

connection.connect();

const multer = require('multer');
const upload = multer({dest: './upload'});

app.get('/api/customers', (req, res) => {
  connection.query(
    "SELECT * FROM management.CUSTOMER",
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req, res) => {
  let sql = 'INSERT INTO management.CUSTOMER VALUES (null, ?, ?, ?, ?, ?)';
  let image = '/image/' + req.file.filename;
  const { name, birth, sex, job } = req.body;
  let params = [image, name, birth, sex, job];
  connection.query(sql, params,
    (err, rows, fields) => {
      console.log(err);
      res.send(rows);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));