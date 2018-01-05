import React from 'react';
import Favorite from './Favorite.jsx';

const FavoritesList = (props) => {
  console.log(props.favorites);
  return (
    <div>
      {
        props.favorites.map((favorite) => (
          <Favorite
            favorite={favorite}
            key={favorite.id}
          />
        ))
      }
    </div>
  )
}

export default FavoritesList;