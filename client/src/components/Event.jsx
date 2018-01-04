import React from 'react';
import $ from 'jquery';

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorited: ''
    }
  }
  favoriteEvent() {
    var favoriteObj = {
      'name': this.props.event.name,
      'location': `${this.props.event._embedded.venues[0].name}, ${this.props.event._embedded.venues[0].state.stateCode}`,
      'description': (this.props.event.info) ? this.props.event.info : 'No description available.',
      'image': this.props.event.images[4].url,
      'date': this.props.event.dates.start.localDate,
      'time': this.props.event.dates.start.localTime.slice(0, 5),
      'genre': this.props.event.classifications[0].genre.name
    };
    this.setState({
      favorited: favoriteObj
    });
    console.log(favoriteObj);
    $.ajax({
      url: '/favorites',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(favoriteObj),
      success: (data) => {
        console.log('POST success: ', data);
        if (data) {
          // events = data._embedded.events;
          // this.state.eventList = events;
          // console.log(events);
          // this.setState({
          //   eventList: events
          // });
          // this.getEvents();
        }
          // console.log(venues);
          // var locationArray = [];
          // this.state.repos.concat(data);
          // console.log('This is events ', events);
        
          // console.log(this.state.eventList);
          // console.log(this.state.eventList[0]._embedded.venues.name);
      },
      error: (data) => {
        console.log('POST error: ', data);
      }
    });
  }
  addToFavorites() {
    // console.log(this.state.favorited);
    
  }
  render() {
    // console.log(this.state.favorited);
    return (
      <div>
        <p>Event: {this.props.event.name}
        <br />Venue: {this.props.event._embedded.venues[0].name + ', ' + this.props.event._embedded.venues[0].state.stateCode}
        <br />
        <button onClick={this.favoriteEvent.bind(this)}>I WANT TO GO</button>
        </p>
      </div>
    );
  }
}

export default Event;