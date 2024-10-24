import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AddToCalendar from "./AddToCalendar";
import "./AddToCalendar.css"
import "./RegisteredEvent.css"
const RegisterForEvent = () => {
  const location = useLocation();
  //Accessing the data passed via navigation from the ticket purchase
  const { event, tickets, venue } = location.state || {};
  const [isClicked, setIsClicked] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);

  const handlePurchase = () => {
    setIsPurchased(true);
    setIsClicked(true);
    alert("Your purchase has been successful! ");
  };
  return (
    <div id="registered-event">
      <p className="title">Event: {event.name.text}</p>
      <p>
        Start: {new Date(event.start.utc).toLocaleString()} <br />
        End: {new Date(event.end.utc).toLocaleString()}
      </p>
      <p>Venue: {venue ? venue.name : "To be announced soon"}</p>
      <p>Tickets: {tickets}</p>
      <button onClick={handlePurchase} disabled={isClicked} className="purchase-button">Purchase</button> 
      {isPurchased ? (
        <div id="add-google-calendar-container">
          <p>Do you want to add this event to your calendar?</p>
          <AddToCalendar RegisteredEvent={event} venue={venue} />
        </div>
      ) : null}
    </div>
  );
};

export default RegisterForEvent;
