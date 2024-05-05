const throttle = require('express-throttle');

const throttler = throttle({
  burst: 10,
  rate: '5/s',
});

module.exports = {
  throttler,
};
