

const _Promise = typeof Promise === 'undefined' ? require('es6-promise').Promise : Promise;

const get = require('./get');

const getInfoRaw = function getInfoRaw(stopNum) {
  return get('realtimebusinformation', stopNum);
};

const getInfo = function getInfo(stop, length) {
  return new _Promise((resolve, reject) => {
    getInfoRaw(stop)
      .then(results => {
        const buses = [];
        results.forEach(bus => buses.push({
          route      : parseInt(bus.route, 10),
          destination: bus.destination,
          origin     : bus.origin,
          expected   : bus.arrivaldatetime.split(' ')[1],
          due        : bus.duetime,
        }));
        resolve(buses.slice(0, length || 5));
      })
      .catch(reject);
  });
};

module.exports = {
  getInfoRaw,
  getInfo,
};
// # sourceMappingURL=realTime.js.map
