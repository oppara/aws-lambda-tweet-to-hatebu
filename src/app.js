/* eslint-disable no-console */

'use strict';

const tweet2hatebu = require('./tweet2hatebu');
const aws = require('aws-sdk');

const sendSns = message => {
  const params = {
    Message: message,
    Subject: 'ERROR: tweet2hatebu',
    TopicArn: process.env.TOPIC_ARN,
  };
  const sns = new aws.SNS({
    apiVersion: '2010-03-31',
    region: 'ap-northeast-1',
  });

  return sns.publish(params).promise();
};

exports.handler = async (event, context) => {
  try {
    await tweet2hatebu.tweet2hatebu();
  } catch (err) {
    console.error(err);
    await sendSns(err.message);
  }

  // console.log("ENVIRONMENT VARIABLES\n" + JSON.stringify(process.env, null, 2));
  return context.logStreamName;
};
