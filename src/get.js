import { isUndefined } from 'lodash';
import request from 'request-promise-native';
import { url } from './config';

export default async function get(endpoint, stopNum) {
  if (isUndefined(stopNum)) throw new Error('Please supply a stop number.');
  try {
    const { results } = await request({
      headers: {
        'User-Agent': 'dublin-bus.js',
      },
      uri : `${url}/${endpoint}?stopid=${stopNum}&format=json`,
      json: true,
    });
    if (results.length === 0) throw new Error("Stop number doesn't exist.");
    return results;
  } catch (err) {
    throw err;
  }
}
