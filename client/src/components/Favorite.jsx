import React from 'react';
import $ from 'jquery';

class Favorite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      purchased: false
    }
  }
  clickPurchase() {
    this.setState({
      purchased: !this.state.purchased
    });
  }
  removeFavorite() {
    this.setState({
      clicked: !this.state.clicked,
      updated: true
    });
    $.ajax({
      url: '/favorites:event',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({'removed': this.props.favorite.id}),
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
      <div className="favoriteDiv">
        <img src={this.props.favorite.image} className="favoriteImage"/>
        <p>
        <strong>Event:</strong><br /> {this.props.favorite.name}<br /><br />
        <strong>Venue:</strong><br /> {this.props.favorite.location}
        </p>
        <p><strong>Description:</strong><br />{this.props.favorite.description}
        <br /><br /><strong>Genre:</strong><br /> {this.props.favorite.genre}</p>
        <p><strong>Date:</strong><br /> {this.props.favorite.date}<br /><br /><strong>Time:</strong><br /> {this.props.favorite.time}</p>
        <div>
          <button style={style1} className="favoriteButton" onClick={this.removeFavorite.bind(this)}>{this.state.clicked ? 'REMOVED' : 'REMOVE'}</button>
          <br /><a href={this.props.favorite.purchase} target="_blank"><button style={style2} className="purchaseButton" onClick={this.clickPurchase.bind(this)}>PURCHASE</button></a>
        </div>
      </div>
    )
  }
}

export default Favorite;