import request from 'request-promise-native';
import { url, agent } from './config';

/**
 * Query dublin bus api
 * @module DublinBus/get
 * @async
 * @param {string} endpoint endpooint to query
 * @param {string} args the arguemtents for that api in the format `stopid=1344&routeid=16`
 * @return {Promise<object>} resolves api object
 */
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
