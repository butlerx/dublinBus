const dBus = require('./lib/app');

const printBuses = ({ stop, buses }) => {
  console.log(`Stop address: ${stop}`);
  for (const i in buses) {
    if (buses[i].due === 'Due') {
      console.log(`${buses[i].route} to ${buses[i].destination} is due now`);
    } else {
      console.log(
        `${buses[i].route} to ${buses[i].destination} expected in ${buses[i].due} min, at ${buses[i]
          .expected}`,
      );
    }
  }
};

const cmdArgs = [1344, 16];
dBus
  .getStopInfoForBuses(cmdArgs[0], cmdArgs.splice(1))
  .then(info => printBuses(info))
  .catch(reason => console.log(`${nick}: Sorry, ${reason}.`));
