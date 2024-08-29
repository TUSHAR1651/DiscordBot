const mongo = require("mongoose");

const urlSchema = new mongo.Schema({
    url: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        unique: true
    }
});

const Url = mongo.model('Url', urlSchema);


module.exports = Url;

