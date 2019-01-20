import { isUndefined, flatten } from 'lodash';
import * as moment from 'moment';
import Base from './get';

export interface RTQuery {
  stop: number | string;
  routes?: string[];
  length?: number;
}

export interface RTInfo {
  route: string;
  expected: Date;
  due: number;
  destination: string;
  origin: string;
  operator: string;
  info: object;
}

interface RTRaw {
  route: string;
  destination: string;
  origin: string;
  arrivaldatetime: string;
  duetime: string;
  operator: string;
  additionalinformation: object;
}

export class RealTime extends Base {
  private static async raw(
    stop: string,
    route?: string,
    length: number = 20,
  ): Promise<RTRaw[]> {
    return this.get(
      'realtimebusinformation',
      Object.assign(
        {
          stopid: stop,
          maxresults: length || 5,
        },
        isUndefined(route) ? {} : { routeid: route },
      ),
    );
  }

  private static format({
    route,
    destination,
    origin,
    arrivaldatetime,
    duetime,
    operator,
    additionalinformation,
  }: RTRaw): RTInfo {
    return {
      route,
      expected: moment(arrivaldatetime, 'DD/MM/YYYY HH:mm:ss').toDate(),
      due: parseInt(duetime, 10),
      destination,
      origin,
      operator,
      info: additionalinformation,
    };
  }

  public static info({ stop, routes, length }: RTQuery): Promise<RTInfo[]> {
    const stopId = `${stop}`;
    if (isUndefined(routes)) {
      return this.raw(stopId, undefined, length).then(results =>
        results.map(this.format),
      );
    }
    return Promise.all(
      routes.map(route =>
        this.raw(stopId, route, length).then(results =>
          results.map(this.format),
        ),
      ),
    ).then(results => {
      const buses = flatten(results);
      buses.sort(
        (a: RTInfo, b: RTInfo) => (a.due < b.due ? -1 : a.due > b.due ? 1 : 0), // eslint-disable-line no-nested-ternary
      );
      return buses.slice(0, length || 20);
    });
  }

  public static next(stop: number): Promise<RTInfo[]> {
    return this.info({ stop, length: 1 });
  }
}
