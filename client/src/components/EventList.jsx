import React from 'react';
import Event from './Event.jsx';

const EventList = (props) => {
  return (
    <div>
    {
      props.events.map((event) => (
        <Event 
          event={event}
          key={event.id}
          onFavoriteChange={props.onFavoriteChange}
        />
      ))
    }
    </div>
  )
}

export default EventList;