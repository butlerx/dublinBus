const moment = require('moment');

module.exports = {
  operatorinformation: {
    errorcode: '0',
    errormessage: '',
    numberofresults: 5,
    timestamp: moment().format('DD/MM/YYYY HH:mm:ss'),
    results: [
      {
        operatorreference: 'BE',
        operatorname: 'Bus Éireann',
        operatordescription: '',
      },
      {
        operatorreference: 'bac',
        operatorname: 'Dublin Bus',
        operatordescription: '',
      },
      {
        operatorreference: 'KB',
        operatorname: 'Kildare Bus',
        operatordescription: '',
      },
      {
        operatorreference: 'LUAS',
        operatorname: 'LUAS',
        operatordescription: '',
      },
      {
        operatorreference: 'ir',
        operatorname: 'Irish Rail',
        operatordescription: '',
      },
    ],
  },
};
