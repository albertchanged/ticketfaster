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
  console.log(req.body.genre);
  console.log(req.body.city);
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
  console.log('This is from POST ', params);
  db.Favorites.create(params)
    .then((event) => {
      res.sendStatus(201);
    })
});

app.get('/favorites', (req, res) => {
  console.log('Hi from get');
  db.Favorites.findAll()
    .then((favorite) => {
      console.log('This is the favorites: ', favorite);
      res.status(200).json(favorite);
    })
});

app.post('/favorites:event', (req, res) => {
  console.log('Hi from trying to delete a favorite');
  let removed = req.body.removed;
  console.log(removed);
  db.Favorites.destroy({where: { id: req.body.removed }})
    .then((favorite) => {
      console.log('This is the removed favorite ', favorite);
      res.sendStatus(201);
    })
})

let port = 1128;

app.listen(process.env.PORT || port, function() {
  console.log(`listening on port ${port}`);
});

