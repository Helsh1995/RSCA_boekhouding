"use strict";

var calendarCronJob = require('../cron-jobs/CalendarCronJob');

module.exports = {

    startCronJobs: function () {
        calendarCronJob.startCalendarCronJob();
    }

};