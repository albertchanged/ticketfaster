import React from 'react';
import Favorite from './Favorite.jsx';

const FavoritesList = (props) => {
  // console.log(props.favorites);
  return (
    <div>
      <p className="favoriteLabel">Here are your {props.favorites.length} favorited events:</p>
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

