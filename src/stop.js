import get from './get';

export default class Stop {
  static raw(stopNum) {
    return get('busstopinformation', stopNum);
  }

  static info(stopNum) {
    return this.raw(stopNum).then(results => ({
      address: results[0].fullname,
      buses  : results[0].operators.routes,
    }));
  }

  static address(stopNum) {
    return this.raw(stopNum).then(results => results[0].fullname);
  }

  static buses(stopNum) {
    return this.raw(stopNum).then(results => results[0].operators.routes);
  }
}
