var mongoose = require("mongoose");

require("./mongo")();

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

    const options = [
        { $match: {} },
        {
            $group: {
                _id: "$_id",
                key: { "$first": "$key" },
                createdAt: { "$first": "$createdAt" },
                totalCount: {
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
                createdAt: { $gte: startDate, $lte: endDate },
                totalCount: { $gte: minCount, $lte: maxCount }
            }
        }
    ];

    const query = await records.aggregate(options);

    return query;
}

module.exports = fetchRecords;
