

const _Promise = typeof Promise === 'undefined' ? require('es6-promise').Promise : Promise;

const get = require('./get');

const getInfoRaw = function getInfoRaw(stopNum) {
  return get('busstopinformation', stopNum);
};

const getInfo = function getInfo(stopNum) {
  return new _Promise((resolve, reject) => {
    getInfoRaw(stopNum)
      .then(results => {
        resolve({
          address: results[0].fullname,
          buses  : results[0].operators.routes,
        });
      })
      .catch(reject);
  });
};

const getAddress = function getAddress(stopNum) {
  return new _Promise((resolve, reject) => {
    getInfoRaw(stopNum)
      .then(results => resolve(results[0].fullname))
      .catch(reject);
  });
};

const getBuses = function getBuses(stopNum) {
  return new _Promise((resolve, reject) => {
    getInfoRaw(stopNum)
      .then(results => resolve(results[0].operators.routes))
      .catch(reject);
  });
};

module.exports = {
  getInfoRaw,
  getInfo,
  getAddress,
  getBuses,
};
// # sourceMappingURL=stop.js.map
