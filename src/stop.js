import get from './get';

export const getInfoRaw = stopNum => get('busstopinformation', stopNum);

export const getInfo = stopNum =>
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

export const getAddress = stopNum =>
  new Promise((resolve, reject) => {
    getInfoRaw(stopNum).then(results => resolve(results[0].fullname)).catch(reject);
  });

export const getBuses = stopNum =>
  new Promise((resolve, reject) => {
    getInfoRaw(stopNum).then(results => resolve(results[0].operators.routes)).catch(reject);
  });

export default {
  getInfoRaw,
  getInfo,
  getAddress,
  getBuses,
};
