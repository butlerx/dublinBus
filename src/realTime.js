import get from './get';

export default class RealTime {
  static raw(stopNum) {
    return get('realtimebusinformation', stopNum);
  }

  static info(stop, length) {
    return this.raw(stop)
      .then(results =>
        results.map(({ route, destination, origin, arrivaldatetime, duetime }) => ({
          route   : parseInt(route, 10),
          expected: arrivaldatetime.split(' ')[1],
          due     : duetime,
          destination,
          origin,
        })),
      )
      .then(buses => buses.slice(0, length || 5));
  }
}
