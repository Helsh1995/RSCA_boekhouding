"use strict";

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Cost = mongoose.model('Cost');


var OtherCostSchema = Schema({

    reason: String,
    amount: Number

});

OtherCostSchema.methods.sanitize = function () {

    return {
        id: this._id,
        date: this.date,
        reason: this.reason,
        amount: this.amount
    };

};

// mongoose.model('OtherCost', OtherCostSchema);
module.exports = Cost.discriminator('OtherCost', OtherCostSchema);

