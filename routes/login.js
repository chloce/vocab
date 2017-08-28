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
    console.log(req.session)
    if(req.session.user){
        connection.query(`SELECT * FROM ${req.session.user.name}`, (err, rows) => {
            if(err){throw err}
            var string = JSON.stringify(rows);
            var json = JSON.parse(string);
            req.session.mywords = json
            res.render('user',{user: req.session.user, words: req.session.mywords})
        })
    } else {
        res.render('login');
    };
});

router.post('/', (req, res, next) => {
    callback = (i) => {
        req.session.user = i
        res.redirect('/login');
    }      
    connection.query(`SELECT * FROM users WHERE name = '${req.body.name}'`, (err, rows) => {
        if(err) {throw err}
        var string = JSON.stringify(rows);
        var json = JSON.parse(string);
        callback(json[0])
    })  
});

module.exports = router;
