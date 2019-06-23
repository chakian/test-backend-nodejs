var express = require('express');
var app = express();

app.use(express.json());

app.get('*', function (req, res) {
    res.send('This server only accepts POST requests!');
});
app.delete('*', function (req, res) {
    res.send('This server only accepts POST requests!');
});
app.put('*', function (req, res) {
    res.send('This server only accepts POST requests!');
});
/*app.post('*', function(req, res) {
    res.send('Invalid route for post operation!');
});*/

app.post('/fetch-records', function(req, res) {
    const fetchRecords = require('../src/fetchRecords');

    const requestParams = {
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        minCount: req.body.minCount,
        maxCount: req.body.maxCount
    };

    const result = fetchRecords(requestParams);

    res.send(result);
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Server listening at http://%s:%s", host, port);
});
