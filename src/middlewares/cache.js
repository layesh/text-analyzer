const cacheHeaders = require('express-cache-headers');

const caching = cacheHeaders({
  ttl: 300,
  private: true,
});

module.exports = {
  caching,
};
