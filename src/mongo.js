var mongoose = require("mongoose");

var env = process.env.NODE_ENV || 'development';

var config = require('./config')[env];

module.exports = () => {
    //prod url if we're in prod environment
    var envUrl = process.env[config.use_env_variable];

    var localUrl = 'mongodb://' + config.database.user + ':' + config.database.password + '@' + config.database.host + ':' + config.database.port + '/' + config.database.db;

    var mongoUrl = envUrl ? envUrl : localUrl;

    const mongoOptions = {
        useNewUrlParser: true,
        autoIndex: false, // Don't build indexes
        reconnectTries: 100, // Never stop trying to reconnect
        reconnectInterval: 500, // Reconnect every 500ms
        poolSize: 10, // Maintain up to 10 socket connections
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0
    };

    mongoose.connect(mongoUrl, mongoOptions).then(
        () => {
            console.log("Connected to mongoDB");
        },
        (err) => {
            console.log("err", err);

            return err;
        });

    return mongoose;
};