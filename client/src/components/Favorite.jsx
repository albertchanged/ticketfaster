import React from 'react';
import $ from 'jquery';

class Favorite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    }
  }
  removeFavorite() {
    this.setState({
      clicked: !this.state.clicked
    })
    $.ajax({
      url: '/favorites:event',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({'removed': this.props.favorite.id}),
      success: (data) => {
        console.log('POST success: ', data);
        this.props.getFavorites();
      },
      error: (data) => {
        console.log('POST error: ', data);
      }
    });
  }
  render() {
    let style = {
      backgroundColor: (this.state.clicked) ? '#009CDE' : 'white',
      color: (this.state.clicked) ? 'white' : '#009CDE'
    }
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
        <button style={style} className="favoriteButton" onClick={this.removeFavorite.bind(this)}>{this.state.clicked ? 'REMOVED' : 'REMOVE'}</button>
      </div>
    )
  }
}

export default Favorite;