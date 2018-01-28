/** @module DublinBus/timetable */
import { isUndefined } from 'lodash';
import moment from 'moment';
import get from './get';

export default class TimeTable {
  static async raw({ stop, route, time, length, type }) {
    if (isUndefined(stop)) throw new Error('Please supply a stop number.');
    if (isUndefined(type)) throw new Error('Please supply TimeTable type');
    if (isUndefined(route)) throw new Error('Please supply route number');
    const routeid = isUndefined(route) ? '' : `&routeid=${route}`;
    let datetime;
    if (!isUndefined(time) && type === 'day') {
      datetime = `&type=day&datetime=${moment(time, 'HH:mm').format('HH:mm:ss')}`;
    } else if (type === 'day') {
      datetime = '&type=day';
    } else if (type === 'week') {
      datetime = '&type=week';
    }
    return get(
      'timetableinformation',
      `stopid=${stop}${datetime}${routeid}&maxresults=${length || 5}`,
    );
  }

  /**
   * Get TimeTable for today at a stop
   *
   * @static
   * @async
   * @function day
   * @param {number} stop The stopid
   * @param {String} routeNum The route number
   * @param {{time: string, length:number}} [args] time string eg: '18:00'
   *        to filter for and length of array returned
   *        NOTE: length is faulty on the api side
   * @return {Promise<Array>} resolves an array of arrivals
   */
  static day(stop, routeNum, { time, length } = { time: undefined, length: 5 }) {
    return this.raw({
      stop,
      route: routeNum,
      time,
      length,
      type: 'day',
    }).then(results =>
      results.map(({ arrivaldatetime, destination, operator, route }) => ({
        route,
        expected: moment(arrivaldatetime, 'DD/MM/YYYY HH:mm:ss').toDate(),
        destination,
        operator,
      })),
    );
  }

  /**
   * Get TimeTable for the week for a stop
   *
   * @static
   * @async
   * @function week
   * @param {number} stop The stopid
   * @param {String} route The route number
   * @return {Promise<Array>} resolves an array of arrivals
   */
  static week(stop, route) {
    return this.raw({ stop, route, type: 'week' }).then(results =>
      results.map(({ startdayofweek, enddayofweek, destination, departures }) => ({
        start: startdayofweek,
        end: enddayofweek,
        destination,
        departures,
      })),
    );
  }
}
