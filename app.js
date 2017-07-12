'use strict';

const realTime = require('./lib/realTime');
const stop = require('./lib/stop');

const getStopInfoForBuses = (stopNum, busNums) => new Promise((resolve, reject) => {
  getStopInfo(stopNum).then(({stop, buses}) => {
    const filteredBuses = [];
    buses.forEach(bus => {
      if (busNums.includes(bus.route)) filteredBuses.push(bus);
    });
    if (filteredBuses.length > 0) resolve({
      stop : stop,
      buses: filteredBuses,
    });
    reject(new Error('No buses for specified routes at this stop.'));
  }).catch(reject);
});

const getStopInfo = (stopNum, length) => new Promise((resolve, reject) => {
  realTime.getInfo(stopNum, length).then(buses => {
    stop.getInfo(stopNum).then(({address}) => resolve({
      stop : address,
      buses: buses,
    }));
  }).catch(reject);
});

const getBusesInfo = (stopNum, busNums) => new Promise((resolve, reject) => {
  getStopInfoForBuses(stopNum, busNums)
    .then(({buses}) => resolve(buses))
    .catch(reject);
});

module.exports = {
  getStopInfo,
  getBusesInfo,
  realTime   : realTime.getInfo,
  realTimeRaw: realTime.getInfoRaw,
  stopInfo   : stop.getInfo,
  stopInfoRaw: stop.getInfoRaw,
  stopAddress: stop.getAddress,
  stopBuses  : stop.getBuses,
};
