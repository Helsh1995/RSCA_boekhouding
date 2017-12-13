"use strict";

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Cost = mongoose.model('Cost');

var BusInfoSchema = Schema({

    competitor: String,

    amountOfMembers: Number,
    costMember: Number,

    amountOfNoneMembers: Number,
    costNoneMember: Number,

    amountOfKids: Number,
    costKid: Number,

    amountOfJupilers: Number,
    costJupiler: Number,

    amountOfColas: Number,
    costCola: Number,

    driverCost: Number,
    busCost: Number


});

BusInfoSchema.methods.sanitize = function () {

    return {

        id: this._id,
        date: this.date,
        competitor: this.competitor,
        amountOfMembers: this.amountOfMembers,
        costMember: this.costMember,
        amountOfNoneMembers: this.amountOfNoneMembers,
        costNoneMember: this.costNoneMember,
        amountOfKids: this.amountOfKids,
        costKid: this.costKid,
        amountOfJupilers: this.amountOfJupilers,
        costJupiler: this.costJupiler,
        amountOfColas: this.amountOfColas,
        costCola: this.costCola,
        driverCost: this.driverCost,
        busCost: this.busCost

    };

};

module.exports = Cost.discriminator('BusCost', BusInfoSchema);