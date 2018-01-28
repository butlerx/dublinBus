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
    console.log(`address: ${await dublinBus.stop.address(1344)}`);
    console.log(`real time: ${JSON.stringify(await dBus.realTime.info({ stop: 1344 }))}`);
    console.log(`just the 9 & 54a bus: ${JSON.stringify(await dBus.realTime.info({ stop: 1344, routes: ['54a', 9] }))}`);
    const { stop, buses } = await dBus.stop.info(1344));
    console.log(`stop: ${stop}'s buses: ${JSON.stringify(buses)}`))
    console.log(`Next bus: ${await dublinBus.realTime.next(1344) });
  } catch (err) {
    console.error(err);
  }
})();
```
