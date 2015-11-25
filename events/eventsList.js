var dbTables = require('../databaseModels/mappingModel'); // map of database tables

var eventsList = function (server) {
  server.route({
    method: 'GET',
    path:'/eventsList/{offsetValue}&{eventsStatus}',
    handler: function (request, reply) {
      var events     = dbTables.events; // select table events

      var response = ''; // response from server to client

      var eventsStatus;

      switch (request.params.eventsStatus) {
        case "all":
          eventsStatus = [true, false];
          break;
        case "off":
          eventsStatus = true;
          break;
        case "unoff":
          eventsStatus = false;
          break;
        default:
          response = JSON.stringify({ "status": 400, "message": "Не найдено событий с такими параметрами!" });
          return reply(response).code(400);

      };

      // selection of events, consider the type of events, the response size - 5 events
      events.find({ is_official: eventsStatus }).orderRaw("?? DESC", ['id']).limit(5).offset(request.params.offsetValue).run(function (err, events) {
        if (events.length === 0) {
          response = JSON.stringify({ "status": 200, "message": "События закончились!" });
          return reply(response).code(200);
        }
        else {
          response = events;
          return reply(response).code(200);
        };
      });
    }
  });
};

module.exports = eventsList;
