var dbTables = require('../databaseModels/mappingModel'); // map of database tables

var drivingBidsList = function (server) {
  server.route({
    method: 'GET',
    path:'/drivingBidsList/{offsetValue}',
    handler: function (request, reply) {
      var driving     = dbTables.driving; // select table news

      var response = ''; // response from server to client

      // selection of driving, the response size - 15 bid
      driving.find().limit(15).offset(request.params.offsetValue).run(function (err, bids) {
        if (bids.length === 0) {
          response = JSON.stringify({ "status": 200, "message": "Заявки закончились!" });
          return reply(response).code(200);
        }
        else {
          response = bids;
          return reply(response).code(200);
        };
      });
    }
  });
};

module.exports = drivingBidsList;
