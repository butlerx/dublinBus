import { isUndefined } from 'lodash';
import * as moment from 'moment';
import Base from './get';

export interface DayTimetable {
  route: string;
  expected: Date;
  destination: string;
  operator: string;
}

export interface WeekTimetable {
  start: string;
  end: string;
  destination: string;
  departures: string[];
}

interface TTRaw {
  arrivaldatetime: string;
  destination: string;
  operator: string;
  route: string;
  startdayofweek: string;
  enddayofweek: string;
  departures: string[];
}

export class TimeTable extends Base {
  private static async raw(
    stop: number | string,
    route: string,
    type: string,
    length: number = 5,
    time?: string,
  ): Promise<TTRaw[]> {
    if (isUndefined(stop)) throw new Error('Please supply a stop number.');
    if (isUndefined(type)) throw new Error('Please supply TimeTable type');
    if (isUndefined(route)) throw new Error('Please supply route number');
    return this.get('timetableinformation', {
      type,
      stopid: `${stop}`,
      maxresults: length,
      routeid: route,
      datetime:
        !isUndefined(time) && type === 'day'
          ? moment(time, 'HH:mm').format('HH:mm:ss')
          : undefined,
    });
  }

  public static async day(
    stop: number | string,
    routeNum: string,
    length: number = 5,
    time?: string,
  ): Promise<DayTimetable[]> {
    const results = await this.raw(stop, routeNum, 'day', length, time);
    return results.map(({ arrivaldatetime, destination, operator, route }) => ({
      route,
      expected: moment(arrivaldatetime, 'DD/MM/YYYY HH:mm:ss').toDate(),
      destination,
      operator,
    }));
  }

  public static async week(
    stop: number | string,
    route: string,
  ): Promise<WeekTimetable[]> {
    const results = await this.raw(stop, route, 'week');
    return results.map(
      ({ startdayofweek, enddayofweek, destination, departures }) => ({
        start: startdayofweek,
        end: enddayofweek,
        destination,
        departures,
      }),
    );
  }
}
