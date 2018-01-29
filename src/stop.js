/** @module DublinBus/stop */
import { isUndefined } from 'lodash';
import get from './get';
import realTime from './realTime';

export default class Stop {
  static async raw(stopNum) {
    if (isUndefined(stopNum)) throw new Error('Please supply a stop number.');
    return get('busstopinformation', `stopid=${stopNum}`);
  }

  /**
   * Get Stop Info
   *
   * @static
   * @async
   * @function info
   * @param {number} stop The number of the stop
   * @return {Promise<Object>} Promise that resolves a stop object
   */
  static info(stop) {
    return this.raw(stop).then(results => ({
      address: results[0].fullname,
      buses: results[0].operators.reduce((a, { routes }) => a.concat(routes), []),
      latitude: results[0].latitude,
      longitude: results[0].longitude,
      operators: results[0].operators,
    }));
  }

  /**
   * Get stop address
   *
   * @async
   * @static
   * @function address
   * @param {number} stopNum The number of the stop
   * @return {Promise<String>} Promise that resolves the address of the stop
   */
  static address(stopNum) {
    return this.raw(stopNum).then(results => results[0].fullname);
  }

  /**
   * Get Buses that serve stop
   *
   * @async
   * @static
   * @function buses
   * @param {number} stopNum The number of the stop
   * @return {Promise<Array>} Promise that resolves an array of bus numbers
   */
  static buses(stopNum) {
    return this.raw(stopNum).then(results =>
      results[0].operators.reduce((a, { routes }) => a.concat(routes), []),
    );
  }

  /**
   * Get stop realtime info
   *
   * @async
   * @static
   * @function info
   * @param {{stop: number, route: String, length: number}} args stop number and length of returned
   * @return {Promise<Object>} Promise that resolves an object that contains the address and buses
   *                           that serve the stop
   */
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

  /**
   * Search for info about a stop
   *
   * @static
   * @async
   * @function search
   * @param {number} stop The number of the stop
   * @return {Promise<Array>} Promise that resolves an array of stops
   */
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
