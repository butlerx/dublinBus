'use strict';

const isUndefined = require('lodash/isUndefined');
const request = require('request-promise-native');
const { url } = require('./config');

const get = (endpoint, stopNum) => new Promise((resolve, reject) => {
  if (isUndefined(stopNum)) reject(new Error('Please supply a stop number.'));
  const options = {
    uri    : `${url}/${endpoint}?stopid=${stopNum}&format=json`,
    headers: {
      'User-Agent': 'dublin-bus.js',
    },
    json: true,
  };

  request(options).then(({ results }) => {
    if(results.length === 0) reject(new Error('Stop number doesn\'t exist.'));
    resolve(results);
  }).catch(reject);
});

module.exports = get;
