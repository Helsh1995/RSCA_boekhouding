"use strict";

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StandingsSchema = Schema({

    teams: [{
        id: String,
        name: String,
        rank: Number,
        wins: Number,
        draws: Number,
        losses: Number,
        goals: {
            made: Number,
            against: Number
        },
        points: Number
    }]

});

StandingsSchema.methods.sanitize = function () {

    var teams = [];

    this.teams.forEach(function (team) {

        teams.push({
            id: team.id,
            name: team.name,
            rank: team.rank,
            wins: team.wins,
            draws: team.draws,
            losses: team.losses,
            goals: {
                made: team.goals.made,
                against: team.goals.against
            },
            points: team.points
        });

    });

    return {
        id: this._id,
        teams: teams
    }

};

mongoose.model('Standing', StandingsSchema);