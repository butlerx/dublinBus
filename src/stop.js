import { isUndefined } from 'lodash';
import get from './get';
import realTime from './realTime';

export default class Stop {
  static async raw(stopNum) {
    if (isUndefined(stopNum)) throw new Error('Please supply a stop number.');
    return get('busstopinformation', `stopid=${stopNum}`);
  }

  static info(stopNum) {
    return this.raw(stopNum).then(results => ({
      address: results[0].fullname,
      buses: results[0].operators.reduce((a, { routes }) => a.concat(routes), []),
      latitude: results[0].latitude,
      longitude: results[0].longitude,
      operators: results[0].operators,
    }));
  }

  static address(stopNum) {
    return this.raw(stopNum).then(results => results[0].fullname);
  }

  static buses(stopNum) {
    return this.raw(stopNum).then(results =>
      results[0].operators.reduce((a, { routes }) => a.concat(routes), []),
    );
  }

  static async realtime({ stop, length }) {
    try {
      return {
        stop: await this.address(stop),
        buses: await realTime.info({ stop, length }),
      };
    } catch (err) {
      throw err;
    }
  }

  static async search(stop) {
    if (isUndefined(stop)) throw new Error('Please supply a search');
    return get('busstopinformation', `stopname=${stop}`).then(stops =>
      stops.map(result => ({
        stopNum: result.stopid,
        address: result.fullname,
        buses: result.operators.reduce((a, { routes }) => a.concat(routes), []),
        latitude: result.latitude,
        longitude: result.longitude,
        operators: result.operators,
      })),
    );
  }
}
