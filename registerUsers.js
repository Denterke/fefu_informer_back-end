var registerUser = function(server) {
  server.route({
    method: 'POST',
    path:'/registerUsers',
    handler: function (request, reply) {
      var yourReq = request.payload;
      console.log(request.payload);
      reply('Your request: ' + yourReq);
    }
  });
};

module.exports = registerUser;
