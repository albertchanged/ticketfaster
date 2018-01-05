import React from 'react';
import Favorite from './Favorite.jsx';
import FadeIn from 'react-fade-in';

const FavoritesList = (props) => {
  // console.log(props.favorites);
  return (
    <div>
      <strong><p className="favoriteLabel">Here are your {props.favorites.length} favorited events:</p></strong>
      {
        props.favorites.map((favorite) => (
          <FadeIn>
            <Favorite
              favorite={favorite}
              key={favorite.id}
              onFavoriteChange={props.onFavoriteChange}
            />
          </FadeIn>
        ))
      }
    </div>
  )
}

export default FavoritesList;

