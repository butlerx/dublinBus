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
