import request from 'request-promise-native';
import { url, agent } from './config';

export default async (endpoint, args) =>
  request({
    headers: {
      'User-Agent': agent,
    },
    uri: `${url}/${endpoint}?${args}&format=json`,
    json: true,
  }).then(({ results }) => {
    if (results.length === 0) throw new Error("Info doesn't exist.");
    return results;
  });
