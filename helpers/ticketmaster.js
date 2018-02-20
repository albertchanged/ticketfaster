const request = require('request');
const config = require('../config.js');

let getEventsByGenre = (genre, city, callback) => {
  let options = {
    url: `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=${genre}&city=${city}&radius=1000&unit=miles&segmentName=music&apikey=${config.KEY}`,
    method: 'GET',
    headers: {
      'User-Agent': 'request',
    }
  }

  request(options, (err, res, body) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, JSON.parse(body));
    }
  });
}

module.exports.getEventsByGenre = getEventsByGenre;