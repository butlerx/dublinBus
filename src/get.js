import request from 'request-promise-native';
import { url } from './config';

export default (endpoint, args) =>
  request({
    headers: {
      'User-Agent': 'dublin-bus.js',
    },
    uri: `${url}/${endpoint}?${args}&format=json`,
    json: true,
  }).then(({ results }) => {
    if (results.length === 0) throw new Error("Info doesn't exist.");
    return results;
  });
