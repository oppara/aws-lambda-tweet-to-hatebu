/* eslint-disable no-console */

// Usage:
// $ export $(cat .env) && node try.js

const tweet2hatebu = require('./tweet2hatebu');

(async () => {
  try {
    await tweet2hatebu.tweet2hatebu();
    console.log('done');
  } catch (err) {
    console.error(err);
  }
})();
