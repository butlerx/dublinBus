const dBus = require('./lib');

const printBuses = ({ stop, buses }) => {
  if (stop) console.log(`Stop address: ${stop}`); // eslint-disable-line no-console
  if (Array.isArray(buses) && buses.length) {
    buses.forEach(bus => {
      if (bus.due === 'Due') {
        console.log(`${bus.route} to ${bus.destination} is due now`); // eslint-disable-line no-console
      } else {
        // eslint-disable-next-line no-console
        console.log(
          `${bus.route} to ${bus.destination} expected in ${bus.due} min, at ${bus.expected}`,
        );
      }
    });
  }
  console.log('\n'); // eslint-disable-line no-console
};

const sorry = reason => console.log(`Sorry, ${reason}.`); // eslint-disable-line no-console

(async () => {
  try {
    printBuses({ stop: await dBus.stopAddress(1344) });
    printBuses({ buses: await dBus.getBusesInfo(1344, [16, 9]) });
    printBuses(await dBus.getStopInfo(1344));
    printBuses({ buses: await dBus.realTime(1344) });
  } catch (err) {
    sorry(err);
  }
})();
