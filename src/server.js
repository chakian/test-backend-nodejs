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

app.post('/fetch-records', async function(req, res) {
    const fetchRecords = require('../src/fetchRecords');

    const requestParams = {
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        minCount: req.body.minCount,
        maxCount: req.body.maxCount
    };

    const result = await fetchRecords(requestParams);

    var response = {
        code: 0,
        msg: "Success",
        records: []
    };

    result.forEach(item => {
        response.records.push({
            key: item.key,
            createdAt: item.createdAt,
            totalCount: item.totalCount
        });
    });

    res.send(response);
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Server listening at http://%s:%s", host, port);
});
