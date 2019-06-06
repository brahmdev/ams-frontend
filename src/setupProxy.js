const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy(['/api/**', '!*/sockjs-node/*', '!**.hot-update.js'], {
      // do NOT redirect hot reload service
      target: 'http://localhost:8080/'
    })
  );
};
