/* eslint-disable no-console */

'use strict';

const tweet2hatebu = require('./tweet2hatebu');

exports.handler = async (event, context) => {
  try {
    await tweet2hatebu.tweet2hatebu();
  } catch (err) {
    console.error(err);
  }

  // console.log("ENVIRONMENT VARIABLES\n" + JSON.stringify(process.env, null, 2));
  return context.logStreamName;
};
