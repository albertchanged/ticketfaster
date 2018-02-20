const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const ticketmaster = require('../helpers/ticketmaster.js');
const db = require('../database/index.js');
const sequelize = require('sequelize');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));

app.post('/events', (req, res) => {
  ticketmaster.getEventsByGenre(req.body.genre, req.body.city, (err, data) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.status(200).json(data);
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
    'genre': req.body.genre,
    'purchase': req.body.purchase
  }
  db.Favorites.create(params)
    .then((event) => {
      res.sendStatus(201);
    });
});

app.get('/favorites', (req, res) => {
  db.Favorites.findAll()
    .then((favorite) => {
      res.status(200).json(favorite);
    });
});

app.post('/favorites:event', (req, res) => {
  db.Favorites.destroy({where: { id: req.body.removed }})
    .then((favorite) => {
      res.sendStatus(201);
    });
});

let port = 1128;

app.listen(process.env.PORT || port, function() {
  console.log(`listening on port ${port}`);
});

