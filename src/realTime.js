import get from './get';

const getInfoRaw = stopNum => get('realtimebusinformation', stopNum);

async function getInfo(stop, length) {
  const buses = [];
  try {
    const results = await getInfoRaw(stop);
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
  } catch (err) {
    throw err;
  }
}

export default {
  getInfoRaw,
  getInfo,
};
