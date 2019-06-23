var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('This server only accepts POST requests!');
});
app.delete('/', function (req, res) {
    res.send('This server only accepts POST requests!');
});
app.put('/', function (req, res) {
    res.send('This server only accepts POST requests!');
});

app.post('/fetch-todo', function(req, res) {
    const fetchTodos = require('../src/fetchTodos');

    const requestParams = {
        startDate: "2019-01-01"
    };

    var result = fetchTodos(requestParams);

    res.send(result);
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Server listening at http://%s:%s", host, port);
});
