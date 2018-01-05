import React from 'react';

class Favorite extends React.Component {
  constructor(props) {
    super(props);
  }
  removeFavorite() {
    console.log('I want to remove this');
  }
  render() {
    return (
      <div className="favoriteDiv">
        <img src={this.props.favorite.image} className="favoriteImage"/>
        <p>
        <strong>Event:</strong><br /> {this.props.favorite.name}<br /><br />
        <strong>Venue:</strong><br /> {this.props.favorite.location}
        </p>
        <p><strong>Description:</strong><br />{this.props.favorite.description}
        <br /><br /><strong>Genre:</strong><br /> {this.props.favorite.genre}</p>
        <p><strong>Date:</strong><br /> {this.props.favorite.date}<br /><br /><strong>Time:</strong><br /> {this.props.favorite.time}</p>
        <button className="favoriteButton" onClick={this.removeFavorite.bind(this)}>REMOVE</button>
      </div>
    )
  }
}

export default Favorite;

// <div className="eventDiv">
//   <img src={this.props.event.images[4].url} className="favoriteImage"/>
//   <p>
//     <strong>Event:</strong><br /> {this.props.event.name}<br /><br />
//     <strong>Venue:</strong><br /> {this.props.event._embedded.venues[0].name + ', ' + this.props.event._embedded.venues[0].state.stateCode}
//   </p>
//   <p><strong>Description:</strong><br />{(this.props.event.info) ? this.props.event.info : 'No description available.'}</p>
//   <p><strong>Date:</strong><br /> 1/4/2018<br /><br /><strong>Time:</strong><br /> 20:08</p>
//   <button className="favoriteButton" onClick={this.favoriteEvent.bind(this)}>I WANT TO GO</button>
// </div>