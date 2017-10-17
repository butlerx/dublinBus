import get from './get';

const getInfoRaw = stopNum => get('realtimebusinformation', stopNum);

const getInfo = (stop, length) =>
  getInfoRaw(stop).then(results => {
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
    return buses.slice(0, length || 5);
  });

export default {
  getInfoRaw,
  getInfo,
};
