import { isUndefined } from 'lodash';
import Base from './get';
import { RealTime, RTInfo } from './realTime';

export interface Operator {
  routes: string[];
}

export interface StopInfo {
  stopNum: string | number;
  address: string;
  buses: string[];
  latitude: number;
  longitude: number;
  operators: Operator[];
}

interface StopRaw {
  stopid: string | number;
  fullname: string;
  operators: Operator[];
  additionalinformation: object;
  latitude: number;
  longitude: number;
}

export class Stop extends Base {
  private static async raw(stopNum: string): Promise<StopRaw[]> {
    if (isUndefined(stopNum)) throw new Error('Please supply a stop number.');
    return this.get('busstopinformation', { stopid: stopNum });
  }

  public static async info(stopNum: string | number): Promise<StopInfo> {
    const results = await this.raw(`${stopNum}`);
    return {
      stopNum,
      address: results[0].fullname,
      buses: results[0].operators.reduce(
        (a: string[], { routes }) => a.concat(routes),
        [],
      ),
      latitude: results[0].latitude,
      longitude: results[0].longitude,
      operators: results[0].operators,
    };
  }

  public static async address(stopNum: string | number): Promise<string> {
    const results = await this.raw(`${stopNum}`);
    return results[0].fullname;
  }

  public static async buses(stopNum: string | number): Promise<string[]> {
    const results = await this.raw(`${stopNum}`);
    return results[0].operators.reduce(
      (a: string[], { routes }) => a.concat(routes),
      [],
    );
  }

  public static async realtime({
    stop,
    length,
  }: {
    stop: string;
    length: number;
  }): Promise<{ stop: string; buses: RTInfo[] }> {
    return {
      stop: await this.address(stop),
      buses: await RealTime.info({ stop, length }),
    };
  }

  public static async search(stop: string | number): Promise<StopInfo[]> {
    if (isUndefined(stop)) throw new Error('Please supply a search');
    const stops = await this.get('busstopinformation', { stopname: `${stop}` });
    return stops.map((result: StopRaw) => ({
      stopNum: result.stopid,
      address: result.fullname,
      buses: result.operators.reduce(
        (a: string[], { routes }) => a.concat(routes),
        [],
      ),
      latitude: result.latitude,
      longitude: result.longitude,
      operators: result.operators,
    }));
  }
}
