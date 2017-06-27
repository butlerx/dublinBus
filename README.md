# Dublin-Bus.js

Node Library for getting Dublin bus read time info

## Installation

``` bash
yarn add dublin-bus.js
```

## Example

```javascript
'use strict';
const dBus = require('dublin-bus.js');

dBus.stopAddress(7602).then(address => {
  console.log(address);
}).catch(reason => {
  console.log(reason);
});

dBus.getStopInfo(1344).then(info => {
  console.log(`stop: ${info.stop}'s buses: ${JSON.stringify(info.buses)}`);
}).catch(reason => {
  console.log(reason);
});

dBus.getBusesInfo(7602, [44]).then(buses => {
  console.log(buses);
}).catch(reason => {
  console.log(reason);
});
```
