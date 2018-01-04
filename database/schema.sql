CREATE DATABASE ticketmaster;

USE ticketmaster;

CREATE TABLE locations(
  id INT AUTO_INCREMENT,
  name VARCHAR(35) NOT NULL,
  state VARCHAR(20) NOT NULL,
  country VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE events(
  id INT AUTO_INCREMENT,
  name VARCHAR(105) NOT NULL,
  state VARCHAR(20) NOT NULL,
  country VARCHAR(30) NOT NULL,
  genre VARCHAR(25) NOT NULL,
  PRIMARY KEY (id)
);

-- mysql -u root < database/schema.sql --