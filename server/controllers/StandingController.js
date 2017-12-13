"use strict";

var apiService = require('../services/ApiService'),
    Standing = require('mongoose').model('Standing'),
    config = require('../config/config');

var StandingsController = {

    fetchStandings: function (callback) {

        console.log('#####  FETCH STANDINGS  #####');

        apiService.makeApiCall('/nl/tournaments/' + config.competitions.beglium_first_division + '/standings.json?api_key=' + config.api_key, 'GET', function (err, response) {
            if (err || !response) {
                return callback({msg: 'No results found'});
            }

            if (response.standings) {

                var findStandingsTotalIndex = response.standings.findIndex(function (standing) {
                    return standing.type === "total";
                });

                if (findStandingsTotalIndex > -1) {
                    var totalStanding = response.standings[findStandingsTotalIndex].groups[0].team_standings;
                    var standing = new Standing();
                    standing.teams = [];

                    totalStanding.forEach(function (team) {

                        standing.teams.push({
                            id: team.team.id,
                            name: team.team.name,
                            rank: team.rank,
                            wins: team.win,
                            draws: team.draw,
                            losses: team.loss,
                            goals: {
                                made: team.goals_for,
                                against: team.goals_against
                            },
                            points: team.points
                        });
                    });

                    Standing.remove({}).exec();

                    standing.save();
                    return callback(null, standing);
                }

            }

            callback({msg: 'Unable to get the standing'});
        });
    },

    getStandings: function (req, res) {

        var findStanding = function (callback) {
            Standing.findOne().exec(function (err, standing) {

                if (standing) {
                    return callback(null, standing);
                }
                callback({msg: 'Not able to find a standing'});
            });
        };

        findStanding(function (err, standing) {

            if (standing) {
                return res.status(200).send(standing.sanitize());
            }

            StandingsController.fetchStandings(function (err, standings) {
                if (err) {
                    return res.status(400).send(err);
                }

                res.status(200).send(standings.sanitize());
            });
        });
    }
};

module.exports = {

    getStandings: StandingsController.getStandings,
    fetchStandings: StandingsController.fetchStandings

};