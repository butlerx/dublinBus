'use strict';

const realTime = require('./lib/realTime');
const stop = require('./lib/stop');

const getStopInfoForBuses = (stopNum, busNums) => {
  return new Promise((resolve, reject) => {
    getStopInfo(stopNum).then(({stop, buses}) => {
      const filteredBuses = [];
      for (let i = 0; i < buses.length; i++) {
        if (busNums.includes(buses[i].route)) {
          filteredBuses.push(buses[i]);
        }
      }
      if (filteredBuses.length > 0) {
        resolve({
          stop : stop,
          buses: filteredBuses,
        });
      } else {
        reject(new Error('No buses for specified routes at this stop.'));
      }
    }).catch(err => reject(err));
  });
};

const getStopInfo = (stopNum, length) => {
  return new Promise((resolve, reject) => {
    realTime.getInfo(stopNum, length).then(buses => {
      stop.getInfo(stopNum).then(({address}) => resolve({
        stop : address,
        buses: buses,
      }));
    }).catch(err => reject(err));
  });
};

const getBusesInfo = (stopNum, busNums) => {
  return new Promise((resolve, reject) => {
    getStopInfoForBuses(stopNum, busNums).then(({buses}) => resolve(buses))
      .catch(err => reject(err));
  });
};

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
