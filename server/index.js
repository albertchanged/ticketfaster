const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const ticketmaster = require('../helpers/ticketmaster.js');
const db = require('../database/index.js');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));

app.post('/events', (req, res) => {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log(req.body.genre);
  ticketmaster.getEventsByGenre(req.body.genre, req.body.city, (err, data) => {
    if (err) {
      res.sendStatus(404);
    } else {
      // if (data.length > 0) {
      res.status(200).json(data);
      // }
    }
  });
});

app.post('/favorites', (req, res) => {
  let params = {
    'name': req.body.name,
    'location': req.body.location,
    'description': req.body.description,
    'image': req.body.image,
    'date': req.body.date,
    'time': req.body.time,
    'genre': req.body.genre
  }
  console.log(params);
  db.Favorites.create(params)
    .then((event) => {
      res.sendStatus(201);
    })
});
app.get('/favorites', (req, res) => {
  // TODO - your code here!
  // This route should send back the top 25 repos
  console.log('trying to get events');
});

let port = 1128;

app.listen(process.env.PORT || port, function() {
  console.log(`listening on port ${port}`);
});

