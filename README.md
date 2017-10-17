# Dublin-Bus.js

Node Library for getting Dublin bus read time info

## Installation

``` bash
yarn add dublin-bus.js
```

## Example

```javascript
const dBus = require('dublin-bus.js');

(async () => {
  try {
    console.log(`address: ${await dBus.stopAddress(1344)}`);
    console.log(`real time: ${JSON.stringify(await dBus.realTime(1344))}`);
    console.log(`just the 9 & 16 bus: ${JSON.stringify(await dBus.getBusesInfo(1344, [16, 9]))}`);
    const { stop, buses } = await dBus.getStopInfo(1344));
    console.log(`stop: ${stop}'s buses: ${JSON.stringify(buses)}`))
  } catch (err) {
    console.error(err);
  }
})();
```
