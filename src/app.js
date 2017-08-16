import realTime from './realTime';
import stopLib from './stop';

export const getStopInfo = (stopNum, length) =>
  new Promise((resolve, reject) => {
    realTime
      .getInfo(stopNum, length)
      .then(buses => {
        stopLib.getInfo(stopNum).then(({ address }) =>
          resolve({
            stop: address,
            buses,
          }),
        );
      })
      .catch(reject);
  });

export const getStopInfoForBuses = (stopNum, busNums) =>
  new Promise((resolve, reject) => {
    getStopInfo(stopNum)
      .then(({ stop, buses }) => {
        const filteredBuses = [];
        buses.forEach(bus => {
          if (busNums.includes(bus.route)) filteredBuses.push(bus);
        });
        if (filteredBuses.length > 0) resolve({ stop, buses: filteredBuses });
        reject(new Error('No buses for specified routes at this stop.'));
      })
      .catch(reject);
  });

export const getBusesInfo = (stopNum, busNums) =>
  new Promise((resolve, reject) => {
    getStopInfoForBuses(stopNum, busNums).then(({ buses }) => resolve(buses)).catch(reject);
  });

export default {
  getStopInfo,
  getBusesInfo,
  getStopInfoForBuses,
  realTime   : realTime.getInfo,
  realTimeRaw: realTime.getInfoRaw,
  stopInfo   : stopLib.getInfo,
  stopInfoRaw: stopLib.getInfoRaw,
  stopAddress: stopLib.getAddress,
  stopBuses  : stopLib.getBuses,
};
