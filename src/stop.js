import get from './get';

const getInfoRaw = stopNum => get('busstopinformation', stopNum);

const getInfo = stopNum =>
  new Promise((resolve, reject) => {
    getInfoRaw(stopNum)
      .then(results => {
        resolve({
          address: results[0].fullname,
          buses  : results[0].operators.routes,
        });
      })
      .catch(reject);
  });

const getAddress = stopNum =>
  new Promise((resolve, reject) => {
    getInfoRaw(stopNum).then(results => resolve(results[0].fullname)).catch(reject);
  });

const getBuses = stopNum =>
  new Promise((resolve, reject) => {
    getInfoRaw(stopNum).then(results => resolve(results[0].operators.routes)).catch(reject);
  });

export default {
  getInfoRaw,
  getInfo,
  getAddress,
  getBuses,
};
