//for working with static file
var staticFiles = function(server) {

  server.register(require('inert'), function () {
    server.route({
      method: 'GET',
      path:'/images/users_avatars/{imgName}',
      handler: function (request, reply) {
        reply.file('images/users_avatars/' + request.params.imgName);
      }
    });

    server.route({
      method: 'GET',
      path:'/images/newsline/{imgName}',
      handler: function (request, reply) {
        //console.log(request.params.imgName);
        reply.file('images/newsline/' + request.params.imgName);
      }
    });

  });

};

module.exports = staticFiles;
