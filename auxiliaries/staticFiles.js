//for working with static file
var staticFiles = function (server) {
  server.register(require('inert'), function () {
    server.route({
      method: 'GET',
      path:'/images/{folder}/{imgName}',
      handler: function (request, reply) {
        reply.file('images/' +request.params.folder+ '/' +request.params.imgName);
      }
    });
  });
};

module.exports = staticFiles;
