export const url =
  process.env.NODE_ENV === 'testing'
    ? 'localhost:3000/cgi-bin/rtpi'
    : 'https://data.dublinked.ie/cgi-bin/rtpi';
export const agent = 'dublin-bus.js';
