"use strict";

var validator = require('validator'),
    moment = require('moment');


var CostBodyCheckerMiddleware = {

    checkPostOther: function (req, res, next) {

        req.checkBody('amount', 'amount must be filled in').notEmpty();
        req.checkBody('amount', 'amount must be a number').isInt();

        var errors = req.validationErrors() || [];

        if (errors.length) {
            return res.status(400).send(errors);
        }

        var body = req.body;

        if (body.date) {
            var date = moment(body.date, "DD/MM/YYYY");
            if (!date.isValid()) {
                return res.status(400).send({msg: "Incorrect date format"});
            }

            body.date = date.toDate();
        }

        if (!body.date) {
            body.date = new Date();
        }

        if (!body.reason) {
            body.reason = '';
        }

        next();

    },

    checkPostBus: function (req, res, next) {

        req.checkBody('competitor', 'competitor must be filled in').notEmpty();

        req.checkBody('amountOfMembers', 'amountOfMembers must be filled in').notEmpty();
        req.checkBody('amountOfMembers', 'amountOfMembers must be a number').isInt();

        req.checkBody('costMember', 'costMember must be filled in').notEmpty();
        req.checkBody('costMember', 'costMember must be a number').isInt();

        req.checkBody('amountOfNoneMembers', 'amountOfNoneMembers must be filled in').notEmpty();
        req.checkBody('amountOfNoneMembers', 'amountOfNoneMembers must be a number').isInt();

        req.checkBody('costNoneMember', 'costNoneMember must be filled in').notEmpty();
        req.checkBody('costNoneMember', 'costNoneMember must be a number').isInt();

        req.checkBody('amountOfKids', 'amountOfKids must be filled in').notEmpty();
        req.checkBody('amountOfKids', 'amountOfKids must be a number').isInt();

        req.checkBody('costKid', 'costKid must be filled in').notEmpty();
        req.checkBody('costKid', 'costKid must be a number').isInt();

        req.checkBody('amountOfJupilers', 'amountOfJupilers must be filled in').notEmpty();
        req.checkBody('amountOfJupilers', 'amountOfJupilers must be a number').isInt();

        req.checkBody('costJupiler', 'costJupiler must be filled in').notEmpty();
        req.checkBody('costJupiler', 'costJupiler must be a number').isInt();

        req.checkBody('amountOfColas', 'amountOfColas must be filled in').notEmpty();
        req.checkBody('amountOfColas', 'amountOfColas must be a number').isInt();

        req.checkBody('costCola', 'costCola must be filled in').notEmpty();
        req.checkBody('costCola', 'costCola must be a number').isInt();

        req.checkBody('driverCost', 'driverCost must be filled in').notEmpty();
        req.checkBody('driverCost', 'driverCost must be a number').isInt();

        req.checkBody('busCost', 'busCost must be filled in').notEmpty();
        req.checkBody('busCost', 'busCost must be a number').isInt();


        var errors = req.validationErrors() || [];

        if (errors.length) {
            return res.status(400).send(errors);
        }

        var body = req.body;

        if (body.date) {

            var date = moment(body.date, "DD/MM/YYYY");

            if (!date.isValid()) {
                return res.status(400).send({msg: "Incorrect date format"});
            }

            body.date = date.toDate();

        }

        if (!body.date) {
            body.date = new Date();
        }


        next();
    }

};

module.exports = CostBodyCheckerMiddleware;