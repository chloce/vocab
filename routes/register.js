const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  database : 'vocabrary'
});

connection.connect();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('register');
});

router.post('/', (req, res, next) => {
    connection.query(`INSERT INTO users (name, pwd, email) values ('${req.body.name}', '${req.body.pwd}', '${req.body.email}')`, (err, result) => {
        if(err) {
            res.redirect('/register')
        }
    });
    connection.query(`CREATE TABLE ${req.body.name} (id INT AUTO_INCREMENT PRIMARY KEY, word CHAR(20), mean CHAR(100) NOT NULL)`);
    req.session.user= req.body;
    res.redirect('/login');
});

module.exports = router;
