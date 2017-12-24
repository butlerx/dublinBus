import { isUndefined } from 'lodash';
import get from './get';

export default class Route {
  static async info(route, operator) {
    if (isUndefined(route)) throw new Error('Please supply a route number.');
    if (isUndefined(operator)) throw new Error('Please supply a operator');
    return get('routeinformation', `routeid=${route}&operator=${operator}`).then(results =>
      results.map(({ origin, destination, stops }) => ({
        origin,
        operator,
        destination,
        stops: stops.map(({ displaystopid, fullname, latitude, longitude }) => ({
          id: parseInt(displaystopid, 10),
          name: fullname,
          latitude,
          longitude,
        })),
      })),
    );
  }

  static async list(operator) {
    if (isUndefined(operator)) throw new Error('Please supply a operator');
    return get('routeinformation', `operator=${operator}`).then(results =>
      results.map(result => ({
        operator: result.operator,
        route: parseInt(result.route, 10),
      })),
    );
  }
}
