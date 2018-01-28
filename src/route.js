import get from './get';

export default class Route {
  static async info(route, operator = 'bac') {
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
