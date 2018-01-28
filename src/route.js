/** @module DublinBus/route */
import get from './get';

export default class Route {
  /**
   * Get Infomation about a route
   *
   * @static
   * @async
   * @function info
   * @param {String} route The route ypur searching for
   * @param {String} [operator=bac] - the Operator name
   * @return {Promise<Array>} resolves an array of routes
   */
  static info(route, operator = 'bac') {
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
}
