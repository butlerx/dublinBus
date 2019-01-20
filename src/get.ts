import * as request from 'request-promise-native';
import { url, agent } from './config';

export default class Base {
  public static async get(
    endpoint: string,
    qs: { [s: string]: string | number | undefined },
  ): Promise<any> {
    qs.format = 'json';
    const { results } = await request({
      headers: {
        'User-Agent': agent,
      },
      qs,
      uri: `${url}/${endpoint}`,
      json: true,
    });
    if (results.length === 0) throw new Error("Info doesn't exist.");
    return results;
  }
}
