"use strict";

var CalendarController = require('../controllers/CalendarController'),
      StandingController = require('../controllers/StandingController'),
      CostController = require('../controllers/CostController'),
      CostBodyCheckerMiddleware = require('../middleware/CostBodyCheckerMiddleware'),
      FindCostMiddleware = require('../middleware/FindCostMiddleware');

module.exports = function (app) {

      app.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');

            res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

            next();
      });

      //CALENDAR
      app.get('/api/calendar', CalendarController.getCalendar); //get the calendar, from server or from db
      app.get('/api/calendar/fresh', CalendarController.getCalendarFreshFromServer);//get the calendar from the server


      //STANDING
      app.get('/api/standing', StandingController.getStandings);//get the calendar from the server


      //COST
      app.get('/api/cost', CostController.getCostOverview); //Get all the costs

      app.delete('/api/cost/:id', CostController.deleteCost); //delete a cost, can be a bus or an other cost

      app.post('/api/cost/other', CostBodyCheckerMiddleware.checkPostOther, CostController.post); //create a new other cost
      app.post('/api/cost/bus', CostBodyCheckerMiddleware.checkPostBus, CostController.post); //create a new bus cost

      app.put('/api/cost/other/:id', FindCostMiddleware.findCost, CostBodyCheckerMiddleware.checkPostOther, CostController.put); //change an other cost
      app.put('/api/cost/bus/:id', FindCostMiddleware.findCost, CostBodyCheckerMiddleware.checkPostBus, CostController.put); //change a bus cost

};