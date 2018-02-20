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
      favoritesList: [],
      favoriteClicked: false,
      searching: false
    }
  }
  componentDidMount() {
    this.getFavorites();
  }
  search (genre, city) {
    this.setState({
      searching: !this.state.searching
    });
    var events = [];
    $.ajax({
      url: '/events',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({'genre': genre, 'city': city}),
      success: (data) => {
        console.log('POST success: ', data);
        if ('_embedded' in data) {
          events = data._embedded.events;
          this.setState({
            eventList: events
          });
        }
      },
      error: (data) => {
        console.error('POST error: ', data);
      }
    });
  }
  showFavorites(clicked) {
    this.setState({
      favoriteClicked: clicked
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
        });
        console.log('These are the favorites', data);
      },
      error: (data) => {
        console.error('ERROR getting ', data)
      }
    })
  }
  render () {
    return (
      <div>
        <h1 className="ticketmasterHeader"><strong><em>ticketfaster</em></strong></h1>
        <div className="topbar">
          <Search onClick={this.search.bind(this)} onFavoriteClick={this.showFavorites.bind(this)} clicked={this.state.favoriteClicked} searching={this.state.searching}/>
        </div>
        {!this.state.searching && <EventList events={this.state.eventList} onFavoriteChange={this.getFavorites.bind(this)} />}
        {this.state.favoriteClicked && <FavoritesList favorites={this.state.favoritesList} onFavoriteChange={this.getFavorites.bind(this)} updated={this.state.updatedFavorites}/>}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));