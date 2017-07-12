const dBus = require('.');

dBus.stopAddress(1344).then(address => console.log(`address: ${address}`)).catch(console.log);

dBus
  .getStopInfo(1344)
  .then(info => console.log(`stop: ${info.stop}'s buses: ${JSON.stringify(info.buses)}`))
  .catch(console.log);

dBus
  .getBusesInfo(1344, [16])
  .then(buses => console.log(`just the 16 bus: ${JSON.stringify(buses)}`))
  .catch(console.log);

dBus
  .realTime(1344)
  .then(buses => console.log(`real time: ${JSON.stringify(buses)}`))
  .catch(console.log);
