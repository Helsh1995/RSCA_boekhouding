"use strict";

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var options = {discriminatorKey: 'kind'};

var CostSchema = Schema({

    date: Date

}, options);

CostSchema.methods.sanitize = function () {

    return {};

};

mongoose.model('Cost', CostSchema);