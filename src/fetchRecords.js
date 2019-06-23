function fetchRecords(params) {
    const mongoose = require('mongoose');

    var env = process.env.NODE_ENV || 'development';
    var config = require('./config')[env];

    const MONGO_USERNAME = config.database.user;
    const MONGO_PASSWORD = config.database.password;
    const MONGO_HOSTNAME = config.database.host;
    const MONGO_PORT = config.database.port;
    const MONGO_DB = config.database.db;

    const url = 'mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin';

    mongoose.connect(url, { useNewUrlParser: true });

    MongoClient.connect(url,
        { useNewUrlParser: true },
        function (err, db) {
            if (err) throw err;
            var dbo = db.db("getir-case-study");
            dbo.collection("records").findOne({}, function (err, result) {
                if (err) throw err;
                console.log(result.name);
                db.close();
            });
        });

    return params.startDate;
}

module.exports = fetchRecords;
