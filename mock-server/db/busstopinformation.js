const moment = require('moment');
const { isUndefined } = require('lodash');

const busstopinformation = [
  {
    stopid: '1344',
    displaystopid: '1344',
    shortname: "Harold's Cross Rd",
    shortnamelocalized: 'Br Chrois Araild',
    fullname: "Harold's Cross Rd",
    fullnamelocalized: '',
    latitude: '53.32722889',
    longitude: '-6.277561944',
    lastupdated: '22/01/2018 09:38:45',
    operators: [
      {
        name: 'bac',
        routes: ['9', '49', '16C', '16', '54A'],
      },
    ],
  },
];

module.exports = stopId => {
  const timestamp = moment().format('DD/MM/YYYY HH:mm:ss');

  if (isUndefined(stopId)) {
    return {
      errorcode: '2',
      errormessage: "'stopid' parameter is required.",
      numberofresults: 0,
      timestamp,
      results: [],
    };
  }
  const results = busstopinformation.filter(({ stopid }) => stopid === stopId);
  const error = results.length === 0;
  return {
    errorcode: error ? 1 : 0,
    errormessage: error ? 'No Results' : '',
    numberofresults: results.length,
    timestamp,
    results,
  };
};
