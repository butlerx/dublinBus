import isUndefined from 'lodash/isUndefined';
import request from 'request-promise-native';
import { url } from './config';

const get = (endpoint, stopNum) =>
  new Promise((resolve, reject) => {
    if (isUndefined(stopNum)) reject(new Error('Please supply a stop number.'));
    const options = {
      uri    : `${url}/${endpoint}?stopid=${stopNum}&format=json`,
      headers: {
        'User-Agent': 'dublin-bus.js',
      },
      json: true,
    };

    request(options)
      .then(({ results }) => {
        if (results.length === 0) reject(new Error("Stop number doesn't exist."));
        resolve(results);
      })
      .catch(reject);
  });

export default get;
