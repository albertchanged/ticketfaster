import React from 'react';
import Event from './Event.jsx';
import FadeIn from 'react-fade-in';

const EventList = (props) => {
  return (
    <div>
    {
      props.events.map((event) => (
        <FadeIn>
          <Event 
            event={event}
            key={event.id}
            onFavoriteChange={props.onFavoriteChange}
          />
        </FadeIn>
      ))
    }
    </div>
  )
}

export default EventList;