function fetchRecords(params) {
    var env = process.env.NODE_ENV || 'development';
    var config = require('./config')[env];

    const MONGO_USERNAME = config.database.user;
    const MONGO_PASSWORD = config.database.password;
    const MONGO_HOSTNAME = config.database.host;
    const MONGO_PORT = config.database.port;
    const MONGO_DB = config.database.db;

    var mongoose = require("mongoose");
    mongoose.Promise = global.Promise;
    //mongodb://dbUser:dbPassword1@ds249623.mlab.com:49623/?authSource=getir-case-study
    //mongodb://dbUser:dbPassword1@ds249623.mlab.com:49623/test-case-study
    const url = 'mongodb://' + MONGO_USERNAME + ':' + MONGO_PASSWORD + '@' + MONGO_HOSTNAME + ':' + MONGO_PORT + '/' + MONGO_DB;

    console.log(url);

    const mongoOptions = {
        useNewUrlParser: true,
        autoIndex: false, // Don't build indexes
        reconnectTries: 100, // Never stop trying to reconnect
        reconnectInterval: 500, // Reconnect every 500ms
        poolSize: 10, // Maintain up to 10 socket connections
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0
    };

    mongoose.connect(url, mongoOptions).then(
        () => {
            console.log("connected to mongoDB")
        },
        (err) => {
            console.log("err", err);
        });

    var recordSchema = new mongoose.Schema({
        key: String,
        value: String,
        createdAt: Date,
        counts: { type : Array , "default" : [] }
    });

    var records = mongoose.model("records", recordSchema);

    const options = {
        limit: 10,
        page: 1
    };

    const recordList = records.find(options);

    console.log(recordList);

    return recordList;
}

module.exports = fetchRecords;
