import realTime from './realTime';
import stopLib from './stop';

async function getStopInfo(stopNum, length) {
  const buses = await realTime.getInfo(stopNum, length);
  const { address } = await stopLib.getInfo(stopNum);
  return {
    stop: address,
    buses,
  };
}

function getStopInfoForBuses(stopNum, busNums) {
  return getStopInfo(Number(stopNum), 20).then(({ stop, buses }) => {
    const filteredBuses = buses.filter(({ route }) => busNums.map(Number).includes(route));
    if (Array.isArray(filteredBuses) && filteredBuses.length) {
      return { stop, buses: filteredBuses };
    }
    throw new Error('No buses for specified routes at this stop');
  });
}

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
