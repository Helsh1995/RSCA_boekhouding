"use strict";

var config = require('../config/config'),
    Cost = require('mongoose').model('Cost'),
    OtherCost = require('../models/costs/OtherCost'),
    BusCost = require('../models/costs/BusCost'),
    moment = require('moment');

var validator = require('validator');


var CostController = {

    getCostOverview: function (req, res) {
        CostController._getAllCosts(function (err, costs) {
            if (costs) {
                res.status(200).send(costs);
            }
        });
    },

    deleteCost: function (req, res) {

        Cost.findOneAndRemove({_id: req.params.id}).exec(function () {
            CostController._getAllCosts(function (err, costs) {
                if (costs) {
                    res.status(200).send(costs);
                }
            });
        });

    },

    post: function (req, res) {
        var body = req.body;

        if (!body) {
            return res.status(400).send({msg: 'You are missing the body parameters'});
        }

        var typeOfCost = req.path.substr(req.path.lastIndexOf('/') + 1);

        switch (typeOfCost) {
            case 'other': {
                return CostController._postOtherCost(body, res);
            }

            case 'bus': {
                return CostController._postBusCost(body, res);
            }
        }

        res.status(400).send({msg: 'Something went wrong'});

    },

    put: function (req, res) {
        var body = req.body;

        if (!body) {
            return res.status(400).send({msg: 'You are missing the body parameters'});
        }

        var cost = req.cost;

        for (var costProp in cost) {
            if (req.body[costProp]) {
                cost[costProp] = req.body[costProp];
            }
        }

        cost.save();

        res.status(200).send(cost.sanitize());

    },

    _getAllCosts: function (callback) {
        Cost.find({}).exec(function (err, costs) {

            if (err) {
                return callback(err);
            }

            var output = [];

            costs.forEach(function (cost) {
                output.push(cost.sanitize());
            });

            callback(null, output);
        });
    },

    _postOtherCost: function (body, res) {

        var otherCost = new OtherCost(body);
        otherCost.save();

        res.status(201).send(otherCost.sanitize());
    },

    _postBusCost: function (body, res) {

        var busCost = new BusCost(body);
        busCost.save();

        res.status(201).send(busCost.sanitize());
    }


};

module.exports = {

    getCostOverview: CostController.getCostOverview,
    deleteCost: CostController.deleteCost,

    post: CostController.post,
    put: CostController.put

};