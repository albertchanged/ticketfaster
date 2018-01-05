import React from 'react';

const Favorite = (props) => (
  <div className="favoriteDiv">
    <img src={props.favorite.image} className="favoriteImage"/>
    <p>Event: {props.favorite.name}
    <br />Venue: {props.favorite.location}
    <br />
    </p>
    {/* <button onClick={this.favoriteEvent.bind(this)}>I WANT TO GO</button> */}
  </div>
)

export default Favorite;