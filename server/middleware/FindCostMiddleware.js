"use strict";

var Cost = require('mongoose').model('Cost');

var FindCostMiddleware = {


    findCost: function (req, res, next) {

        Cost.findOne({_id: req.params.id}).exec(function (err, cost) {

            if (err) {
                return res.status(400).send({msg: "We are unable to find the cost"});
            }

            req.cost = cost;
            next();
        });

    }

};

module.exports = FindCostMiddleware;