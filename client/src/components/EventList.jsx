import React from 'react';
import Event from './Event.jsx';

const EventList = (props) => {
  return (
    <div>
    <div>
    {
      props.events.map((event) => (
        <Event 
          event={event}
          key={event.id}
        />
      ))
    }
    </div>
      <div className="eventDiv">
      <img src="https://s1.ticketm.net/dam/a/d48/7e9a0941-4272-40a1-aa78-cbd93f36fd48_525721_RETINA_PORTRAIT_3_2.jpg" className="favoriteImage"/>
      <p><strong>Event:</strong> Fake Event<br /><strong>Venue:</strong> Fake Venue</p>
      <p><strong>Description:</strong><br />adfasklfjdasl;kfjdslfkdsajflka;dsjf</p>
      <p><strong>Date:</strong> 1/4/2018<br /><strong>Time:</strong> 20:08</p>
      <button className="favoriteButton">I WANT TO GO</button>
    </div>
    </div>
  )

}

export default EventList;