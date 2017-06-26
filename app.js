'use strict';

const _ = require('lodash');
const tabletojson = require('tabletojson');
const url = 'http://www.dublinbus.ie/en/RTPI/Sources-of-Real-Time-Information/?searchtype=view&searchquery=';

const getBusesInfo = (stopNum, busNums) => {
  return new Promise((resolve, reject) => {
    getStopInfo(stopNum).then((buses) => {
      const filteredBuses = [];
      for (let i = 0; i < buses.length; i++) {
        if (busNums.includes(buses[i].num)) {
          filteredBuses.push(buses[i]);
        }
      }
      if (filteredBuses.length > 0) {
        resolve(filteredBuses);
      } else {
        reject(new Error('No buses for specified routes at this stop.'));
      }
    }).catch((err) => {
      reject(err);
    });
  });
};

const getStopInfo = (stopNum) => {
  return new Promise((resolve, reject) => {
    if (_.isUndefined(stopNum)) {
      reject(new Error('please supply a stop number.'));
    } else {
      tabletojson.convertUrl(`${url}${stopNum}`).then(tablesAsJson => {
        if (tablesAsJson.length === 2) {
          reject(new Error('stop number doesn\'t exist.'));
        } else {
          const buses = [];
          if (_.isUndefined(tablesAsJson[3][0]['0'])) {
            for (let i = 0; i < 5 && i < tablesAsJson[3].length; i++) {
              let due = tablesAsJson[3][i]['Expected Time'];
              if (due === 'Due') {
                due = 0;
              }
              buses.push({
                num     : parseInt(tablesAsJson[3][i]['Route'], 10),
                route   : tablesAsJson[3][i]['Destination'],
                expected: parseInt(due, 10),
              });
            }
            resolve(buses);
          } else {
            reject(new Error('No realtime information is currently available for this stop.'));
          }
        }
      });
    }
  });
};

const stopAddress = (stopNum) => {
  return new Promise((resolve, reject) => {
    if (_.isUndefined(stopNum)) {
      reject(new Error('Please supply a stop number.'));
    } else {
      tabletojson.convertUrl(`${url}${stopNum}`).then(tablesAsJson => {
        if (tablesAsJson.length === 2) {
          reject(new Error('Stop number doesn\'t exist.'));
        } else {
          if (_.isUndefined(tablesAsJson[3][0]['0'])) {
            resolve(tablesAsJson[2][0]['Stop Address']);
          }
          else reject(new Error('Stop number doesn\'t exist.'));
        }
      });
    }
  });
};

exports = module.exports = {
  stopAddress,
  getStopInfo,
  getBusesInfo,
};
