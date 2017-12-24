import get from './get';
import realTime from './realTime';
import stopLib from './stop';
import timetable from './timeTable';
import routeLib from './route';

export default class DublinBus {
  static get realTime() {
    return realTime;
  }

  static get stop() {
    return stopLib;
  }

  static get timetable() {
    return timetable;
  }

  static get route() {
    return routeLib;
  }

  static get operators() {
    return get('operatorinformation', '');
  }
}
