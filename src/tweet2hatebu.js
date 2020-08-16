/* eslint-disable no-console */

'use strict';

const compose = require('request-compose');
compose.Request.oauth = require('request-oauth');
const request = compose.client;

const HATENA_API_URL = 'https://bookmark.hatenaapis.com/rest/1/my/bookmark';

// https://developer.twitter.com/en/docs/twitter-api/v1/tweets/timelines/api-reference/get-statuses-user_timeline
const TWITTER_API_URL =
  'https://api.twitter.com/1.1/statuses/user_timeline.json';
const TWEETS_PER_REQUEST = 100;
const TWITTER_SCREEN_NAME = 'opp_hatena';
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
  const query = {
    screen_name: TWITTER_SCREEN_NAME,
    count: TWEETS_PER_REQUEST
  };

  return request({
    method: 'GET',
    url: TWITTER_API_URL,
    headers: {
      authorization: 'Bearer ' + process.env.TWITTER_BEARER,
      'content-type': 'application/json',
    },
    qs: query
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
  const len = body.length;
  for (let i = 0; i < len; i++) {
    const obj = body[i];
    const [title, tmp] = obj.text.split(' B! ');
    if (typeof tmp === 'undefined') {
      return;
    }
    const [url, tag] = tmp.split(' tags: ');
    const tags = excludeTags(tag);
    console.log(title + '\t' + url + '\t' + tags);
    await post2hatebu(url, tags);
  }
};
