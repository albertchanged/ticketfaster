const request = require('request');
const config = require('../config.js');

let getEventsByGenre = (genre, city, callback) => {
  console.log(genre, city);
  let options = {
    url: `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=${genre}&city=${city}&radius=1000&unit=miles&segmentName=music&apikey=${config.KEY}`,
    method: 'GET',
    headers: {
      'User-Agent': 'request',
      // 'Authorization': `token ${config.KEY}`
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