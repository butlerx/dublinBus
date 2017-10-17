import get from './get';

const getInfoRaw = stopNum => get('busstopinformation', stopNum);

const getInfo = stopNum =>
  getInfoRaw(stopNum).then(results => ({
    address: results[0].fullname,
    buses  : results[0].operators.routes,
  }));

const getAddress = stopNum => getInfoRaw(stopNum).then(results => results[0].fullname);

const getBuses = stopNum => getInfoRaw(stopNum).then(results => results[0].operators.routes);

export default {
  getInfoRaw,
  getInfo,
  getAddress,
  getBuses,
};
