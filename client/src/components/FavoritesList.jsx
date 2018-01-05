import React from 'react';
import Favorite from './Favorite.jsx';

const FavoritesList = (props) => {
  // console.log(props.favorites);
  return (
    <div>
      <strong><p className="favoriteLabel">Here are your {props.favorites.length} favorited events:</p></strong>
      {
        props.favorites.map((favorite) => (
          <Favorite
            favorite={favorite}
            key={favorite.id}
            onFavoriteChange={props.onFavoriteChange}
          />
        ))
      }
    </div>
  )
}

export default FavoritesList;

