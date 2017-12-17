import realTime from './realTime';
import stopLib from './stop';

export default class DublinBus {
  static getBusesInfo(stopNum, busNums) {
    return this.getStopInfoForBuses(stopNum, busNums).then(({ buses }) => buses);
  }

  static async getStopInfo(stopNum, length) {
    try {
      return {
        stop : await stopLib.info(stopNum).address,
        buses: await realTime.info(stopNum, length),
      };
    } catch (err) {
      throw err;
    }
  }

  static getStopInfoForBuses(stopNum, busNums) {
    return this.getStopInfo(Number(stopNum), 20).then(({ stop, buses }) => {
      const filteredBuses = buses.filter(({ route }) => busNums.map(Number).includes(route));
      if (Array.isArray(filteredBuses) && filteredBuses.length) {
        return { stop, buses: filteredBuses };
      }
      throw new Error('No buses for specified routes at this stop');
    });
  }

  static get realTime() {
    return realTime;
  }

  static get stop() {
    return stopLib;
  }
}
