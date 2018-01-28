import get from './get';
import realTime from './realTime';
import stop from './stop';
import timetable from './timeTable';
import route from './route';

export default class DublinBus {
  static get realTime() {
    return realTime;
  }

  static get stop() {
    return stop;
  }

  static get timetable() {
    return timetable;
  }

  static get route() {
    return route.info;
  }

  static get operators() {
    return get('operatorinformation', '').then(opers =>
      opers.map(({ operatorreference, operatorname, operatordescription }) => ({
        reference: operatorreference,
        name: operatorname,
        description: operatordescription,
      })),
    );
  }
}
