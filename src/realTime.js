import get from './get';

const getInfoRaw = stopNum => get('realtimebusinformation', stopNum);

const getInfo = (stop, length) =>
  new Promise((resolve, reject) => {
    getInfoRaw(stop)
      .then(results => {
        const buses = [];
        results.forEach(({ route, destination, origin, arrivaldatetime, duetime }) =>
          buses.push({
            route   : parseInt(route, 10),
            expected: arrivaldatetime.split(' ')[1],
            due     : duetime,
            destination,
            origin,
          }),
        );
        resolve(buses.slice(0, length || 5));
      })
      .catch(reject);
  });

export default {
  getInfoRaw,
  getInfo,
};
