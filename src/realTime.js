/** @module DublinBus/realTime */
import { isUndefined, flatten } from 'lodash';
import moment from 'moment';
import get from './get';

const format = ({
  route,
  destination,
  origin,
  arrivaldatetime,
  duetime,
  operator,
  additionalinformation,
}) => ({
  route,
  expected: moment(arrivaldatetime, 'DD/MM/YYYY HH:mm:ss').toDate(),
  due: parseInt(duetime, 10),
  destination,
  origin,
  operator,
  info: additionalinformation,
});

export default class RealTime {
  static async raw({ stop, route, length }) {
    if (isUndefined(stop)) throw new Error('Please supply a stop number.');
    const filter = isUndefined(route) ? '' : `&routeid=${route}`;
    return get('realtimebusinformation', `stopid=${stop}${filter}&maxresults=${length || 5}`);
  }

  /**
   * Get All real time info for stop
   *
   * @async
   * @static
   * @function info
   * @param {{stop: number, route: String, length: number}} args stop number,
   *            route id and length of array to return
   * @return {Promise<Array>} Promise that resolves an array containing all real time info
   */
  static info({ stop, routes, length }) {
    if (isUndefined(routes)) {
      return this.raw({ stop, length }).then(results => results.map(format));
    }
    return Promise.all(
      routes.map(route => this.raw({ stop, route, length }).then(results => results.map(format))),
    ).then(results => {
      const buses = flatten(results);
      // eslint-disable-next-line no-nested-ternary
      buses.sort((a, b) => (a.due < b.due ? -1 : a.due > b.due ? 1 : 0));
      return buses.slice(0, length || 20);
    });
  }

  /**
   * Get next bus for stop
   *
   * @async
   * @static
   * @function next
   * @param {number} stop The number of the stop
   * @return {Promise<Object>} Promise that resolves a onject of the next buses to arrive
   */
  static next(stop) {
    return this.info({ stop, length: 1 }).then(buses => buses[0]);
  }
}
