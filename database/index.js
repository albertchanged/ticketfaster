const Sequelize = require('sequelize');
const orm = new Sequelize('ticketmaster', 'root', '');

const Favorites = orm.define('Favorites', {
  name: Sequelize.STRING,
  location: Sequelize.STRING,
  description: Sequelize.TEXT,
  time: Sequelize.DATE,
  genre: Sequelize.STRING,
});

Favorites.sync();

exports.Favorites = Favorites;
