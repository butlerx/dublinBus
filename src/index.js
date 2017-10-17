import realTime from './realTime';
import stopLib from './stop';

const getStopInfo = (stopNum, length) =>
  realTime.getInfo(stopNum, length).then(buses =>
    stopLib.getInfo(stopNum).then(({ address }) => ({
      stop: address,
      buses,
    })),
  );

const getStopInfoForBuses = (stopNum, busNums) =>
  getStopInfo(Number(stopNum), 20).then(({ stop, buses }) => {
    const filteredBuses = buses.filter(({ route }) => busNums.map(Number).includes(route));
    if (Array.isArray(filteredBuses) && filteredBuses.length) {
      return { stop, buses: filteredBuses };
    }
    throw new Error('No buses for specified routes at this stop');
  });

const getBusesInfo = (stopNum, busNums) =>
  getStopInfoForBuses(stopNum, busNums).then(({ buses }) => buses);

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
