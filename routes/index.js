const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  database : 'vocabrary'
})

let wordmeans = []

connection.connect();

/* GET home page. */
router.get('/', (req, res, next) => {
  wordmeans = [];
  if(req.session.user){
      res.render('user', {words: req.session.mywords});
  } else {
    res.render('login')
  }
});

router.post('/', (req, res, next) => {
  connection.query(`INSERT INTO ${req.session.user.name} (word, mean) values ('${req.body.word}', '${req.body.mean}')`);
  req.session.mywords.push({word: req.body.word, mean:req.body.mean})
  res.redirect('/');
});

module.exports = router;
