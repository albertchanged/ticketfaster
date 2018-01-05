import React from 'react';
import $ from 'jquery';
import _ from 'lodash';
var config = require('.../../../config.js');

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [{'id': 1, 'city': 'San Francisco', 'state': 'CA'}, {'id': 2, 'city': 'Los Angeles', 'state': 'CA'}],
      genre: '',
      city: '',
      selectedLocation: '',
      selectedGenre: '',
      favoriteClicked: false,
      searching: true
    }
  }
  componentDidMount() {
    $.ajax({
      url: `https://app.ticketmaster.com/discovery/v2/venues.json?&apikey=${config.KEY}`,
      type: 'GET',
      async: true,
      dataType: "json",
      success: (data) => {
        console.log('GET success: ', data._embedded);
        var venues = data._embedded.venues;
        // console.log(venues);
        var locationArray = [];
        venues.forEach((venue) => {
          var locationObj = {
            'id': venue.id,
            'city': venue.city.name,
            'state': venue.state.stateCode
          }
          locationArray.push(locationObj);
        })
        locationArray = _.uniqBy(locationArray, 'city');
        console.log(locationArray);
        locationArray = locationArray.sort((a, b) => { console.log(a.city + ', ' + b.city); return a.city - b.city; });
        console.log(locationArray);
        this.setState({
          locations: locationArray
        })
        // this.getRepos();
      },
      error: (data) => {
        console.log('GET error: ', data);
      }
    });
  }
  handleLocationChange(event) {
    event.preventDefault();
    this.setState({
      selectedLocation: event.target.value
    });
  }
  handleGenreChange(event) {
    event.preventDefault();
    this.setState({
      selectedGenre: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.onClick(this.state.genre, this.state.city);
    this.props.onFavoriteClick(this.state.favoriteClicked);
  }
  sendData() {
    this.setState({
      genre: this.state.selectedGenre.toLowerCase(),
      city: this.state.selectedLocation.toLowerCase().replace(/\s/g, '')
    });
  }
  sendClicked() {
    this.setState({
      favoriteClicked: !this.state.favoriteClicked,
      searching: !this.state.searching
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <div className="inputDiv">
              <div>
                <p>Genre</p>
                <select
                  id="dropdown"
                  value={this.state.selectedGenre}
                  onChange={this.handleGenreChange.bind(this)}
                >
                  <option key='0' value='Country'>Country</option>
                  <option key='1' value='Dance'>Dance</option>
                  <option key='2' value='Metal'>Metal</option>
                  <option key='3' value='R&B'>R&B</option>
                  <option key='4' value='Rap'>Rap</option>
                  <option key='5' value='Rock'>Rock</option>
                </select>
              </div>
              <div>
              <p>City</p>
              <select 
                id="dropdown" 
                value={this.state.selectedLocation}
                onChange={this.handleLocationChange.bind(this)}>
                {
                  this.state.locations.map((location) => (
                    (<option key={location.id} value={location.city}>{location.city + ', ' + location.state}</option>)
                  ))
                }
              </select>
              </div>
              <div>
                <p>Search</p>
                <button id="searchButton" onClick={this.sendData.bind(this)}>Search for events</button>
              </div>
              <div></div>
              <div>
                <p>Favorites</p>
                <button id="viewFavButton" onClick={this.sendClicked.bind(this)}>View favorited events</button>
              </div>
            </div>
            <br />
            { (!this.state.favoriteClicked && this.state.searching) ? 
              <div className="searchLabel">
              <p>Search results for <strong><span className="labelStyle">{(this.state.selectedGenre) ? this.state.selectedGenre : 'awesome'}</span></strong> events in <strong><span className="labelStyle">{(this.state.selectedLocation) ? this.state.selectedLocation : 'the best city'}</span>:</strong></p>
            </div>
            : null }
          </div>
        </form>
      </div>
    )
  }
}
export default Search;