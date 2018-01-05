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
      <div className="eventDiv">
        <img src={this.props.event.images[4].url} className="favoriteImage"/>
        <p>
          <strong>Event:</strong><br /> {this.props.event.name}<br /><br />
          <strong>Venue:</strong><br /> {this.props.event._embedded.venues[0].name + ', ' + this.props.event._embedded.venues[0].state.stateCode}
        </p>
        <p><strong>Description:</strong><br />{(this.props.event.info) ? this.props.event.info : 'No description available.'}
        <br /><br /><strong>Genre:</strong><br /> {this.props.event.classifications[0].genre.name}</p>
        <p><strong>Date:</strong><br />{this.props.event.dates.start.localDate}<br /><br /><strong>Time:</strong><br />{this.props.event.dates.start.localTime.slice(0, 5)}</p>
        <button className="favoriteButton" onClick={this.favoriteEvent.bind(this)}>I WANT TO GO</button>
      </div>
    );
  }
}

export default Event;

// </div>
// <div className="eventDiv">
// <img src="https://s1.ticketm.net/dam/a/d48/7e9a0941-4272-40a1-aa78-cbd93f36fd48_525721_RETINA_PORTRAIT_3_2.jpg" className="favoriteImage"/>
// <p><strong>Event:</strong> Fake Event<br /><strong>Venue:</strong> Fake Venue</p>
// <p><strong>Description:</strong><br />adfasklfjdasl;kfjdslfkdsajflka;dsjf</p>
// <p><strong>Date:</strong> 1/4/2018<br /><strong>Time:</strong> 20:08</p>
// <button className="favoriteButton">I WANT TO GO</button>
// </div>