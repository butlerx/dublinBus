'use strict';

const get = require('./get');

const getInfoRaw = (stopNum) => new Promise((resolve, reject) => {
  get('realtimebusinformation', stopNum)
    .then(resolve)
    .catch(reject);
});

const getInfo = (stop, length) => new Promise((resolve, reject) => {
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
  }).catch(reject);
});

module.exports = {
  getInfoRaw,
  getInfo,
};
