const mongo = require("mongoose");
const Url = require("./UrlModel");



async function handleGetUrl(req, res) {
    const shortUrl = req.params.url;
    const url = await Url.findOne({
        shortUrl,
    });
    if (!url) {
        return res.status(404).json({
            message: "URL not found",
        });
    }
    return res.status(200).redirect(url.url);
}

module.exports = {
    handleGetUrl,
};
