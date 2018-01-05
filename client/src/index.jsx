import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import EventList from './components/EventList.jsx';
import FavoritesList from './components/FavoritesList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventList: [],
      favoritesList: []
    }
  }
  componentDidMount() {
    this.getFavorites();
  }
  search (genre, city) {
    // console.log(`${term} was searched`);
    // TODO
    // console.log(term);
    var events = [];
    $.ajax({
      url: '/events',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({'genre': genre, 'city': city}),
      success: (data) => {
        console.log('POST success: ', data);
        if (data) {
          events = data._embedded.events;
          this.state.eventList = events;
          // console.log(events);
          // this.setState({
          //   eventList: events
          // });
          this.getEvents();
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

  getEvents() {
    this.setState({
      eventList: this.state.eventList
    });
  }

  getFavorites() {
    $.ajax({
      url: '/favorites',
      method: 'GET',
      contentType: 'application/json',
      success: (data) => {
        this.setState({
          favoritesList: data
        })
        console.log('These are the favorites', data);
      },
      error: (data) => {
        console.log('ERROR getting ', data)
      }
    })
  }

  render () {
    console.log('In the render ', this.state.eventList)
    return (
      <div>
        <h1 className="ticketmasterHeader"><strong><em>ticketfaster</em></strong></h1>
        {/* <h2 className="fetchbertHeader">&nbsp;/fetchbert</h2> */}
        <div className="topbar">
        <Search onClick={this.search.bind(this)}/>
        </div>
        <EventList events={this.state.eventList}/>
        <FavoritesList favorites={this.state.favoritesList} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));