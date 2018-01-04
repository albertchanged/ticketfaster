const Sequelize = require('sequelize');
const orm = new Sequelize('ticketmaster', 'root', '', {
  dialect: 'mysql'
});

const Favorites = orm.define('Favorites', {
  name: Sequelize.STRING,
  location: Sequelize.STRING,
  description: Sequelize.TEXT,
  image: Sequelize.TEXT,
  date: Sequelize.STRING,
  time: Sequelize.STRING,
  genre: Sequelize.STRING,
}, {
  timestamps: false
});

Favorites.sync();

exports.Favorites = Favorites;
