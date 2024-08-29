const { handleGetUrl } = require('./UrlController');
const express = require('express');

const UrlRoute = express.Router();

UrlRoute.get('/:url', handleGetUrl);

module.exports = {
    UrlRoute,
}