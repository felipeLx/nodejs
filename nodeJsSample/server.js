var express = require('express');
var quotes = require('./quotes');

var app = express();
var port = 3000;
var bodyParse = require('body-parser');

app.listen(port, function() {
    console.log('Express listen on port ' + port);
});

app.get('/', function(request, response) {
    response.send("Get request received at '/'");
});

// app.get('/quotes', function(req, res) {
//     console.log("Get a list of all quotes as json");
//     res.json(quotes);
// });

app.get('/quotes', function(req, res) {
    if(req.query.year) {
        res.send("Return a list of quotes from the year: " + req.query.year);
    } else{
        res.json(quotes);
    }
});

app.get('/quotes/:id', function(req, res) {
    console.log("return quote with the ID: " + req.params.id);
    res.send("Return quote with the ID: " + req.params.id);
});

// app.post('/quotes', function(req, res) {
//     console.log("insert a new quote");
// });

app.use(bodyParse.urlencoded({extended: true}));

app.post('/quotes', function(req, res) {
    console.log("Insert a new quote: " + req.body.quote);
    res.json(req.body);
})

app.delete('/quotes/:id', function(req, res) {
    console.log("Delete quote with the ID: " + req.params.id);
    res.send("Delete quote with the ID: " + req.params.id);
});

app.put('/quotes/:id', function(req, res) {
    console.log("Change quote with the ID: " + req.params.id);
    res.send("Change quote with the ID: " + req.params.id);
});

var db = new mysql.Database('myDatabase.db');