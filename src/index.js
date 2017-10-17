import realTime from './realTime';
import stopLib from './stop';

const getStopInfo = (stopNum, length) =>
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

const getStopInfoForBuses = (stopNum, busNums) =>
  new Promise((resolve, reject) => {
    getStopInfo(stopNum, 20)
      .then(({ stop, buses }) => {
        const filteredBuses = buses.filter(bus => busNums.map(Number).includes(bus.route));
        if (filteredBuses) resolve({ stop, buses: filteredBuses });
        reject(new Error('No buses for specified routes at this stop'));
      })
      .catch(reject);
  });

const getBusesInfo = (stopNum, busNums) =>
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
