"use strict";

var request = require('request'),
    config = require('../config/config');

module.exports = {

    makeApiCall: function (url, method, callback) {
        request(config.api_url + url, function (err, response, body) {
            try {
                if (err) {
                    return callback(err);
                }
                callback(null, JSON.parse(body));

            } catch (err) {
                console.log(err);
            }
        });

    }

};