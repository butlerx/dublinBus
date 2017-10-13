const dBus = require('./lib/app');

const printBuses = ({ stop, buses }) => {
  console.log(`Stop address: ${stop}`);
  buses.forEach(bus => {
    if (bus.due === 'Due') {
      console.log(`${bus.route} to ${bus.destination} is due now`);
    } else {
      console.log(
        `${bus.route} to ${bus.destination} expected in ${bus.due} min, at ${bus.expected}`,
      );
    }
  });
};

const cmdArgs = [1344, 16];
dBus
  .getStopInfoForBuses(cmdArgs[0], cmdArgs.splice(1))
  .then(info => printBuses(info))
  .catch(reason => console.log(`Sorry, ${reason}.`));
