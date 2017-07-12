const get = require('./get');

const getInfoRaw = stopNum => get('realtimebusinformation', stopNum);

const getInfo = (stop, length) =>
  new Promise((resolve, reject) => {
    getInfoRaw(stop)
      .then(results => {
        const buses = [];
        results.forEach(bus =>
          buses.push({
            route      : parseInt(bus.route, 10),
            destination: bus.destination,
            origin     : bus.origin,
            expected   : bus.arrivaldatetime.split(' ')[1],
            due        : bus.duetime,
          }),
        );
        resolve(buses.slice(0, length || 5));
      })
      .catch(reject);
  });

module.exports = {
  getInfoRaw,
  getInfo,
};
