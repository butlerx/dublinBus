const moment = require('moment');
const { isUndefined } = require('lodash');
const realtimebusinformation = require('./db.json');

module.exports = (routeId, operator) => {
  const timestamp = moment().format('DD/MM/YYYY HH:mm:ss');

  if (isUndefined(routeId) || isUndefined(operator)) {
    return {
      errorcode: '2',
      errormessage: `'${isUndefined(routeId) ? 'routeid' : 'operat'}' parameter is required.`,
      numberofresults: 0,
      route: !isUndefined(routeId) ? routeId : null,
      timestamp,
      results: [],
    };
  }
  const results = realtimebusinformation
    .filter(({ route }) => route === routeId)[0]
    .results.filter(rt => rt.operator === operator);
  const error = results.length === 0;
  return {
    errorcode: error ? 1 : 0,
    errormessage: error ? 'No Results' : '',
    numberofresults: results.length,
    route: routeId,
    timestamp,
    results,
  };
};
