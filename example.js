'use strict';
const dBus = require('.');

dBus.stopAddress(7602).then(address => {
  console.log(address);
}).catch(reason => {
  console.log(reason);
});

dBus.getStopInfo(7602).then(buses => {
  console.log(buses);
}).catch(reason => {
  console.log(reason);
});

dBus.getBusesInfo(7602, [44]).then(buses => {
  console.log(buses);
}).catch(reason => {
  console.log(reason);
});
