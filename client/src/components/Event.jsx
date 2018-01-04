import React from 'react';

const Event = (props) => (
  <div>
    <p>Event: {props.event.name}
    <br />Venue: {props.event._embedded.venues[0].name + ', ' + props.event._embedded.venues[0].state.stateCode}
    <br />
    <button>I WANT TO GO</button>
    </p>
  </div>
)
// events[0]._embedded.venues[0].name
export default Event;