'use strict';

const request = require('request-promise-native');
const _ = require('lodash');
const url = 'https://data.dublinked.ie/cgi-bin/rtpi';

const getInfoRaw = (stopNum) => {
  return new Promise((resolve, reject) => {
    if (_.isUndefined(stopNum)) {
      reject(new Error('please supply a stop number.'));
    } else {
      const options = {
        uri    : `${url}/realtimebusinformation?stopid=${stopNum}&format=json`,
        headers: {
          'User-Agent': 'dublin-bus.js',
        },
        json: true,
      };

      request(options)
        .then(({ results }) => {
          if(results.length === 0) {
            reject(new Error('Stop number doesn\'t exist.'));
          }
          resolve(results);
        }).catch((reason) => reject(reason));
    }
  });
};

const getInfo = (stop, length) => {
  return new Promise((resolve, reject) => {
    getInfoRaw(stop).then( results => {
      const buses = [];
      results.forEach(bus => {
        buses.push({
          route      : parseInt(bus.route, 10),
          destination: bus.destination,
          origin     : bus.origin,
          expected   : bus.arrivaldatetime.split(' ')[1],
          due        : bus.duetime,
        });
      });
      length = length || 5;
      resolve(buses.slice(0, length));
    }).catch((reason) => reject(reason));
  });
};

module.exports = {
  getInfoRaw,
  getInfo,
};
