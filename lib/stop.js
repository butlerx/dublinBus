'use strict';

const request = require('request-promise-native');
const _ = require('lodash');
const url = 'https://data.dublinked.ie/cgi-bin/rtpi';

const getInfoRaw = (stopNum) => {
  return new Promise((resolve, reject) => {
    if (_.isUndefined(stopNum)) {
      reject(new Error('Please supply a stop number.'));
    } else {
      const options = {
        uri    : `${url}/busstopinformation?stopid=${stopNum}&format=json`,
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

const getInfo = (stopNum) => {
  return new Promise((resolve, reject) => {
    getInfoRaw(stopNum).then( results => {
      resolve({
        address: results[0].fullname,
        buses  : results[0].operators.routes,
      });
    }).catch((reason) => reject(reason));
  });
};

const getAddress = (stopNum) => {
  return new Promise((resolve, reject) => {
    getInfoRaw(stopNum).then( results => resolve(results[0].fullname) )
      .catch((reason) => reject(reason));
  });
};

const getBuses = (stopNum) => {
  return new Promise((resolve, reject) => {
    getInfoRaw(stopNum).then( results => resolve(results[0].operators.routes) )
      .catch((reason) => reject(reason));
  });
};

module.exports = {
  getInfoRaw,
  getInfo,
  getAddress,
  getBuses,
};
