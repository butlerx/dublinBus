const jsonServer = require('json-server');
const realtimebusinformation = require('./db/realtimebusinformation');
const routeinformation = require('./db/routeinformation');
const busstopinformation = require('./db/busstopinformation');

const server = jsonServer.create();
const router = jsonServer.router(require('./db'));

const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use('/cgi-bin/rtpi', router);

server.use('/cgi-bin/rtpi/realtimebusinformation', (req, res) => {
  res.json(routeinformation(req.param('stopid'), req.param('routeid'), req.param('maxresults')));
});

server.use('/cgi-bin/rtpi/routeinformation', (req, res) => {
  res.json(realtimebusinformation(req.param('routeid'), req.param('operator')));
});

server.use('/cgi-bin/rtpi/busstopinformation', (req, res) => {
  res.json(busstopinformation(req.param('stopid')));
});

server.listen(3000, () => {
  console.log('JSON Server is running'); // eslint-disable-line no-console
});
