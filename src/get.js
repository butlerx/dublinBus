import { isUndefined } from 'lodash';
import request from 'request-promise-native';
import { url } from './config';

export default function get(endpoint, stopNum) {
  if (isUndefined(stopNum)) throw new Error('Please supply a stop number.');
  return request({
    headers: {
      'User-Agent': 'dublin-bus.js',
    },
    uri : `${url}/${endpoint}?stopid=${stopNum}&format=json`,
    json: true,
  }).then(({ results }) => {
    if (results.length === 0) throw new Error("Stop number doesn't exist.");
    return results;
  });
}
