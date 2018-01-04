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
      selected: ''
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
  handleChange(event) {
    event.preventDefault();
    this.setState({
      selected: event.target.value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.onClick(this.state.genre, this.state.city);
  }
  sendData() {
    this.setState({
      genre: document.getElementById('genreInput').value,
      city: this.state.selected.toLowerCase().replace(/\s/g, '')
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <h3>Specify a genre!</h3>
            <input id="genreInput" type="text" />
            <h3>Specify a city!</h3>
            <select 
              id="cityDropdown" 
              value={this.state.selected}
              onChange={this.handleChange.bind(this)}>
              {
                this.state.locations.map((location) => (
                  (<option key={location.id} value={location.city}>{location.city + ', ' + location.state}</option>)
                ))
              }
            </select>
            <button onClick={this.sendData.bind(this)}>Search!</button>
          </div>
        </form>
      </div>
    )
  }
}
export default Search;