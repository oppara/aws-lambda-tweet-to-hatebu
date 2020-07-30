/* eslint-disable no-console */

'use strict';

const moment = require('moment');
const compose = require('request-compose');
compose.Request.oauth = require('request-oauth');
const request = compose.client;

const FROM_DATE_HOURS = 12;
const MAX_TWEETS = 100;
const TWITTER_API_URL =
  'https://api.twitter.com/1.1/tweets/search/30day/prod.json';
const HATENA_API_URL = 'https://bookmark.hatenaapis.com/rest/1/my/bookmark';
const EXCLUDE_TAGS = ['todo', 'instapaper'];

const post2hatebu = (url, tags) => {
  return request({
    method: 'POST',
    url: HATENA_API_URL,
    oauth: {
      consumer_key: process.env.HATENA_CONSUMER_KEY,
      consumer_secret: process.env.HATENA_CONSUMER_SECRET,
      token: process.env.HATENA_ACCESS_TOKEN,
      token_secret: process.env.HATENA_ACCESS_TOKEN_SECRET,
    },
    form: { url, tags },
  });
};

const retrieveTweets = () => {
  const data = {
    query: 'from:opp_hatena lang:ja',
    maxResults: MAX_TWEETS,
    fromDate: moment()
      .subtract(FROM_DATE_HOURS, 'hours')
      .utc()
      .format('YYYYMMDDHHmm'),
  };

  return request({
    method: 'POST',
    url: TWITTER_API_URL,
    headers: {
      authorization: 'Bearer ' + process.env.TWITTER_BEARER,
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

const excludeTags = (tag) => {
  const tags = typeof tag !== 'undefined' ? tag.split(', ') : '';
  if (!Array.isArray(tags)) {
    return tags;
  }

  return tags.filter((val) => {
    return !EXCLUDE_TAGS.includes(val);
  });
};

exports.tweet2hatebu = async () => {
  const { body } = await retrieveTweets();
  const len = body.results.length;
  for (let i = 0; i < len; i++) {
    const obj = body.results[i];
    const [title, tmp] = obj.text.split(' B! ');
    if (typeof tmp === 'undefined') {
      return;
    }
    const [url, tag] = tmp.split(' tags: ');
    // const tags = typeof tag !== 'undefined' ? tag.split(', ') : '';
    const tags = excludeTags(tag);
    console.log(title + '\t' + url + '\t' + tags);
    await post2hatebu(url, tags);
  }
};
