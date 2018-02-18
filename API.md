## Modules

<dl>
<dt><a href="#module_DublinBus/get">DublinBus/get</a> ⇒ <code>Promise.&lt;object&gt;</code></dt>
<dd><p>Query dublin bus api</p>
</dd>
<dt><a href="#module_DublinBus">DublinBus</a></dt>
<dd></dd>
<dt><a href="#module_DublinBus/realTime">DublinBus/realTime</a></dt>
<dd></dd>
<dt><a href="#module_DublinBus/route">DublinBus/route</a></dt>
<dd></dd>
<dt><a href="#module_DublinBus/stop">DublinBus/stop</a></dt>
<dd></dd>
<dt><a href="#module_DublinBus/timetable">DublinBus/timetable</a></dt>
<dd></dd>
</dl>

<a name="module_DublinBus/get"></a>

## DublinBus/get ⇒ <code>Promise.&lt;object&gt;</code>

Query dublin bus api

**Returns**: <code>Promise.&lt;object&gt;</code> - resolves api object

| Param    | Type                | Description                                                         |
| -------- | ------------------- | ------------------------------------------------------------------- |
| endpoint | <code>string</code> | endpooint to query                                                  |
| args     | <code>string</code> | the arguemtents for that api in the format `stopid=1344&routeid=16` |

<a name="module_DublinBus"></a>

## DublinBus

<a name="module_DublinBus.operators"></a>

### DublinBus.operators ⇒ <code>Promise.&lt;Object&gt;</code>

Get a list of all operators

**Kind**: static property of [<code>DublinBus</code>](#module_DublinBus)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - Promise that resolves an object
containing all operators info  
<a name="module_DublinBus/realTime"></a>

## DublinBus/realTime

* [DublinBus/realTime](#module_DublinBus/realTime)
  * [.info(args)](#module_DublinBus/realTime.info) ⇒
    <code>Promise.&lt;Array&gt;</code>
  * [.next(stop)](#module_DublinBus/realTime.next) ⇒
    <code>Promise.&lt;Object&gt;</code>

<a name="module_DublinBus/realTime.info"></a>

### DublinBus/realTime.info(args) ⇒ <code>Promise.&lt;Array&gt;</code>

Get All real time info for stop

**Kind**: static method of
[<code>DublinBus/realTime</code>](#module_DublinBus/realTime)  
**Returns**: <code>Promise.&lt;Array&gt;</code> - Promise that resolves an array
containing all real time info

| Param | Type                | Description                                         |
| ----- | ------------------- | --------------------------------------------------- |
| args  | <code>Object</code> | stop number, route id and length of array to return |

<a name="module_DublinBus/realTime.next"></a>

### DublinBus/realTime.next(stop) ⇒ <code>Promise.&lt;Object&gt;</code>

Get next bus for stop

**Kind**: static method of
[<code>DublinBus/realTime</code>](#module_DublinBus/realTime)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - Promise that resolves a onject
of the next buses to arrive

| Param | Type                | Description            |
| ----- | ------------------- | ---------------------- |
| stop  | <code>number</code> | The number of the stop |

<a name="module_DublinBus/route"></a>

## DublinBus/route

<a name="module_DublinBus/route.info"></a>

### DublinBus/route.info(route, [operator]) ⇒ <code>Promise.&lt;Array&gt;</code>

Get Infomation about a route

**Kind**: static method of
[<code>DublinBus/route</code>](#module_DublinBus/route)  
**Returns**: <code>Promise.&lt;Array&gt;</code> - resolves an array of routes

| Param      | Type                | Default          | Description                  |
| ---------- | ------------------- | ---------------- | ---------------------------- |
| route      | <code>String</code> |                  | The route ypur searching for |
| [operator] | <code>String</code> | <code>bac</code> | the Operator name            |

<a name="module_DublinBus/stop"></a>

## DublinBus/stop

* [DublinBus/stop](#module_DublinBus/stop)
  * [.info(stop)](#module_DublinBus/stop.info) ⇒
    <code>Promise.&lt;Object&gt;</code>
  * [.address(stopNum)](#module_DublinBus/stop.address) ⇒
    <code>Promise.&lt;String&gt;</code>
  * [.buses(stopNum)](#module_DublinBus/stop.buses) ⇒
    <code>Promise.&lt;Array&gt;</code>
  * [.info(args)](#module_DublinBus/stop.info) ⇒
    <code>Promise.&lt;Object&gt;</code>
  * [.search(stop)](#module_DublinBus/stop.search) ⇒
    <code>Promise.&lt;Array&gt;</code>

<a name="module_DublinBus/stop.info"></a>

### DublinBus/stop.info(stop) ⇒ <code>Promise.&lt;Object&gt;</code>

Get Stop Info

**Kind**: static method of
[<code>DublinBus/stop</code>](#module_DublinBus/stop)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - Promise that resolves a stop object

| Param | Type                | Description            |
| ----- | ------------------- | ---------------------- |
| stop  | <code>number</code> | The number of the stop |

<a name="module_DublinBus/stop.address"></a>

### DublinBus/stop.address(stopNum) ⇒ <code>Promise.&lt;String&gt;</code>

Get stop address

**Kind**: static method of
[<code>DublinBus/stop</code>](#module_DublinBus/stop)  
**Returns**: <code>Promise.&lt;String&gt;</code> - Promise that resolves the address
of the stop

| Param   | Type                | Description            |
| ------- | ------------------- | ---------------------- |
| stopNum | <code>number</code> | The number of the stop |

<a name="module_DublinBus/stop.buses"></a>

### DublinBus/stop.buses(stopNum) ⇒ <code>Promise.&lt;Array&gt;</code>

Get Buses that serve stop

**Kind**: static method of
[<code>DublinBus/stop</code>](#module_DublinBus/stop)  
**Returns**: <code>Promise.&lt;Array&gt;</code> - Promise that resolves an array
of bus numbers

| Param   | Type                | Description            |
| ------- | ------------------- | ---------------------- |
| stopNum | <code>number</code> | The number of the stop |

<a name="module_DublinBus/stop.info"></a>

### DublinBus/stop.info(args) ⇒ <code>Promise.&lt;Object&gt;</code>

Get stop realtime info

**Kind**: static method of
[<code>DublinBus/stop</code>](#module_DublinBus/stop)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - Promise that resolves an object
that contains the address and buses that serve the stop

| Param | Type                | Description                        |
| ----- | ------------------- | ---------------------------------- |
| args  | <code>Object</code> | stop number and length of returned |

<a name="module_DublinBus/stop.search"></a>

### DublinBus/stop.search(stop) ⇒ <code>Promise.&lt;Array&gt;</code>

Search for info about a stop

**Kind**: static method of
[<code>DublinBus/stop</code>](#module_DublinBus/stop)  
**Returns**: <code>Promise.&lt;Array&gt;</code> - Promise that resolves an array
of stops

| Param | Type                | Description            |
| ----- | ------------------- | ---------------------- |
| stop  | <code>number</code> | The number of the stop |

<a name="module_DublinBus/timetable"></a>

## DublinBus/timetable

* [DublinBus/timetable](#module_DublinBus/timetable)
  * [.day(stop, routeNum, [args])](#module_DublinBus/timetable.day) ⇒
    <code>Promise.&lt;Array&gt;</code>
  * [.week(stop, route)](#module_DublinBus/timetable.week) ⇒
    <code>Promise.&lt;Array&gt;</code>

<a name="module_DublinBus/timetable.day"></a>

### DublinBus/timetable.day(stop, routeNum, [args]) ⇒ <code>Promise.&lt;Array&gt;</code>

Get TimeTable for today at a stop

**Kind**: static method of
[<code>DublinBus/timetable</code>](#module_DublinBus/timetable)  
**Returns**: <code>Promise.&lt;Array&gt;</code> - resolves an array of arrivals

| Param    | Type                | Description                                                                                               |
| -------- | ------------------- | --------------------------------------------------------------------------------------------------------- |
| stop     | <code>number</code> | The stopid                                                                                                |
| routeNum | <code>String</code> | The route number                                                                                          |
| [args]   | <code>Object</code> | time string eg: '18:00' to filter for and length of array returned NOTE: length is faulty on the api side |

<a name="module_DublinBus/timetable.week"></a>

### DublinBus/timetable.week(stop, route) ⇒ <code>Promise.&lt;Array&gt;</code>

Get TimeTable for the week for a stop

**Kind**: static method of
[<code>DublinBus/timetable</code>](#module_DublinBus/timetable)  
**Returns**: <code>Promise.&lt;Array&gt;</code> - resolves an array of arrivals

| Param | Type                | Description      |
| ----- | ------------------- | ---------------- |
| stop  | <code>number</code> | The stopid       |
| route | <code>String</code> | The route number |
