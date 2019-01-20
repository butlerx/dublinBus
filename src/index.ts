import Base from './get';
import { RealTime } from './realTime';
import { Stop } from './stop';
import { TimeTable } from './timeTable';

export interface OperatorInfo {
  reference: string;
  name: string;
  description: string;
}

export interface RouteInfo {
  origin: string;
  destination: string;
  operator: string;
  stops: { id: number; name: string; latitude: number; longitude: number }[];
}

export default class DublinBus extends Base {
  public static get operators(): Promise<OperatorInfo[]> {
    return this.get('operatorinformation', {}).then(opers =>
      opers.map(
        ({
          operatorreference,
          operatorname,
          operatordescription,
        }: {
          [s: string]: string;
        }) => ({
          reference: operatorreference,
          name: operatorname,
          description: operatordescription,
        }),
      ),
    );
  }

  public static get realTime(): RealTime {
    return RealTime;
  }

  public static async route(
    route: string,
    operator: string = 'bac',
  ): Promise<RouteInfo> {
    const results = await this.get('routeinformation', {
      routeid: route,
      operator,
    });
    return results.map(
      ({
        origin,
        destination,
        stops,
      }: {
        origin: string;
        destination: string;
        stops: { [s: string]: string }[];
      }) => ({
        origin,
        operator,
        destination,
        stops: stops.map(
          ({
            displaystopid,
            fullname,
            latitude,
            longitude,
          }: {
            [s: string]: string;
          }) => ({
            id: parseInt(displaystopid, 10),
            name: fullname,
            latitude,
            longitude,
          }),
        ),
      }),
    );
  }

  public static get stop(): Stop {
    return Stop;
  }

  public static get timetable(): TimeTable {
    return TimeTable;
  }
}
