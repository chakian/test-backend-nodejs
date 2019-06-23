var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];

const MONGO_USERNAME = config.database.user;
const MONGO_PASSWORD = config.database.password;
const MONGO_HOSTNAME = config.database.host;
const MONGO_PORT = config.database.port;
const MONGO_DB = config.database.db;

const url = 'mongodb://' + MONGO_USERNAME + ':' + MONGO_PASSWORD + '@' + MONGO_HOSTNAME + ':' + MONGO_PORT + '/' + MONGO_DB;

const mongoOptions = {
    useNewUrlParser: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: 100, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
};

var recordSchema = new mongoose.Schema({
    key: String,
    value: String,
    createdAt: Date,
    counts: { type: Array, "default": [] }
});

var records = mongoose.model("records", recordSchema);

async function fetchRecords(params) {
    var startDate, endDate, minCount, maxCount;

    if (params.startDate) {
        try {
            startDate = new Date(params.startDate + "T00:00:00.000Z");
        }
        catch (e) {
            return "startDate must be a non empty string in YYYY-MM-dd format";
        }
    }
    if (params.endDate) {
        try {
            endDate = new Date(params.endDate + "T23:59:59.999Z");
        }
        catch (e) {
            return "endDate must be a non empty string in YYYY-MM-dd format";
        }
    }
    if (params.minCount) {
        try {
            minCount = parseInt(params.minCount);
        }
        catch (e) {
            return "minCount must be an integer";
        }
    }
    if (params.maxCount) {
        try {
            maxCount = parseInt(params.maxCount);
        }
        catch (e) {
            return "maxCount must be an integer";
        }
    }

    mongoose.connect(url, mongoOptions).then(
        () => {
            console.log("connected to mongoDB")
        },
        (err) => {
            console.log("err", err);
        });

    const options = [
        { $match: {} },
        {
            $group: {
                _id: "$_id",
                key: { "$first": "$key" },
                value: { "$first": "$value" },
                createdAt: { "$first": "$createdAt" },
                Total: {
                    "$sum": {
                        "$sum": {
                            "$map": {
                                "input": "$counts",
                                "as": "item",
                                "in": "$$item"
                            }
                        }
                    }
                }
            }
        },
        {
            $match: {
                //createdAt: { $gte: startDate, $lte: endDate },
                Total: { $gte: minCount, $lte: maxCount }
            }
        }
    ];

    const query = records.aggregate(options);
    const recordList = await query.exec();
    /*.then(recordList => {
        mongoose.disconnect();

        if (!recordList) {
            return "Unwanted error";
        }

        console.log(recordList);

        return recordList;

    }).catch(error => {
        mongoose.disconnect();

        console.error(error);
        //res.json({success: false, error: error.message});
        next(error);
    });*/

    console.log(recordList);

    return recordList;
}

module.exports = fetchRecords;
