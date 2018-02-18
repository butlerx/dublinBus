/** @module DublinBus */

import 'babel-polyfill';
import get from './get';
import realTime from './realTime';
import stop from './stop';
import timetable from './timeTable';
import route from './route';

export default class DublinBus {
  /**
   * Get a list of all operators
   * @name operators
   * @static
   * @return {Promise<Object>} Promise that resolves an object containing all operators info
   */
  static get operators() {
    return get('operatorinformation', '').then(opers =>
      opers.map(({ operatorreference, operatorname, operatordescription }) => ({
        reference: operatorreference,
        name: operatorname,
        description: operatordescription,
      })),
    );
  }

  /**
   * @static
   * @returns {Object} realTime Module
   */
  static get realTime() {
    return realTime;
  }

  /**
   * @static
   * @returns {function} route modules info function
   */
  static get route() {
    return route.info;
  }

  /**
   * @static
   * @returns {Object} stop Module
   */
  static get stop() {
    return stop;
  }

  /**
   * @static
   * @returns {Object} timetable Module
   */
  static get timetable() {
    return timetable;
  }
}
