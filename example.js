const dublinBus = require('.');

function printBuses({ stop, buses }) {
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
}

const sorry = reason => console.log(`Sorry, ${reason}.`); // eslint-disable-line no-console

function printStop({ buses, address }) {
  if (address) console.log(`Stop address: ${address}`); // eslint-disable-line no-console
  if (Array.isArray(buses) && buses.length) {
    // eslint-disable-next-line no-console
    console.log(`Buses: ${buses.join(', ')}`);
  }
  console.log('\n'); // eslint-disable-line no-console
}

(async () => {
  try {
    printBuses({ stop: await dublinBus.stop.address(1344) });
    printBuses({
      buses: await dublinBus.realTime.info({ stop: 1344, routes: ['54a', 9] }),
    });
    printStop(await dublinBus.stop.info(1344));
    printBuses({ buses: await dublinBus.realTime.next(1344) });
  } catch (err) {
    sorry(err);
  }
})();
