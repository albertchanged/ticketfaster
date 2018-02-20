import React from 'react';
import $ from 'jquery';

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorited: '',
      clicked: false,
      purchased: false
    }
  }
  purchaseClicked() {
    this.setState({
      purchased: !this.state.purchased
    })
  }
  favoriteEvent() {
    var favoriteObj = {
      'name': this.props.event.name,
      'location': `${this.props.event._embedded.venues[0].name}, ${this.props.event._embedded.venues[0].state.stateCode}`,
      'description': (this.props.event.info) ? this.props.event.info : 'No description available.',
      'image': this.props.event.images[4].url,
      'date': this.props.event.dates.start.localDate,
      'time': this.props.event.dates.start.localTime.slice(0, 5),
      'genre': this.props.event.classifications[0].genre.name,
      'purchase': this.props.event.url
    };
    this.setState({
      favorited: favoriteObj,
      clicked: !this.state.clicked
    });
    console.log(favoriteObj);
    $.ajax({
      url: '/favorites',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(favoriteObj),
      success: (data) => {
        console.log('POST success: ', data);
        this.props.onFavoriteChange();
      },
      error: (data) => {
        console.error('POST error: ', data);
      }
    });
  }
  render() {
    let style1 = {
      backgroundColor: (this.state.clicked) ? '#009CDE' : 'white',
      color: (this.state.clicked) ? 'white' : '#009CDE'
    }
    let style2 = {
      backgroundColor: (this.state.purchased) ? '#009CDE' : 'white',
      color: (this.state.purchased) ? 'white' : '#009CDE'
    }
    return (
      <div className="eventDiv">
        <img src={this.props.event.images[4].url} className="favoriteImage"/>
        <p>
          <strong>Event:</strong><br /> {this.props.event.name}<br /><br />
          <strong>Venue:</strong><br /> {this.props.event._embedded.venues[0].name + ', ' + this.props.event._embedded.venues[0].state.stateCode}
        </p>
        <p><strong>Description:</strong><br />{(this.props.event.info) ? this.props.event.info : 'No description available.'}
        <br /><br /><strong>Genre:</strong><br /> {this.props.event.classifications[0].genre.name}</p>
        <p><strong>Date:</strong><br />{this.props.event.dates.start.localDate}<br /><br /><strong>Time:</strong><br />{this.props.event.dates.start.localTime.slice(0, 5)}</p>
        <div>
          <button style={style1} className="favoriteButton" onClick={this.favoriteEvent.bind(this)}>{this.state.clicked ? 'GOING' : 'I WANT TO GO'}</button>
          <br /><a href={this.props.event.url} target="_blank"><button style={style2} className="purchaseButton" onClick={this.purchaseClicked.bind(this)}>PURCHASE</button></a>
        </div>
      </div>
    );
  }
}

export default Event;