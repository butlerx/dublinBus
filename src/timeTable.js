import { isUndefined } from 'lodash';
import get from './get';

function getDay(num) {
  switch (num) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    default:
      return '';
  }
}

export default class TimeTable {
  static async raw({ stop, route, date, length, type }) {
    if (isUndefined(stop)) throw new Error('Please supply a stop number.');
    if (isUndefined(type)) throw new Error('Please supply TimeTable type');
    const routeid = isUndefined(route) ? '' : `&routeid=${route}`;
    let datetime;
    if (isUndefined(date) && type === 'day') {
      datetime = `&type=day&datetime=${date}`;
    } else if (type === 'day') {
      datetime = '&type=day';
    } else if (type === 'week') {
      datetime = '&type=day';
    }
    return get(
      'timetableinformation',
      `stopid=${stop}${datetime}${routeid}&maxresults=${length || 5}`,
    );
  }

  static day({ stop, route, date, length }) {
    return this.raw({ stop, route, date, length, type: 'day' }).then(results =>
      results.map(({ arrivaldatetime, destination, operator, route }) => ({
        route: parseInt(route, 10),
        expected: new Date(arrivaldatetime),
        destination,
        operator,
      })),
    );
  }

  static async week(stop, routeNum) {
    if (isUndefined(routeNum)) throw new Error('Please supply route number');
    return this.raw({ stop, route: routeNum, type: 'week' }).then(results =>
      results.map(({ startdayofweek, enddayofweek, destination, departures }) => ({
        start: getDay(startdayofweek),
        end: getDay(enddayofweek),
        destination,
        departures: departures.map(time => new Date(time)),
      })),
    );
  }
}
