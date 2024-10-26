import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AddToCalendar from "./AddToCalendar";
import "./AddToCalendar.css";
import "./RegisteredEvent.css";
const RegisterForEvent = () => {
  const location = useLocation();
  //Accessing the data passed via navigation from the ticket purchase
  const { event, ticketsToBuy, ticketDetails, venue } = location.state || {};
  const [isClicked, setIsClicked] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const ticketsCost = Math.ceil(
    (ticketDetails ? ticketDetails.cost.value : 0) / 100
  );

  const handlePurchase = () => {
    setIsPurchased(true);
    setIsClicked(true);
  };

  const handleCancel = () => {
    setIsPurchased(false);
    setIsClicked(true);
  };
  return (
    <div id="registered-event">
      <h2 className="registered-event-heading">
        {isClicked
          ? "Your purchased event!"
          : "Please check the event details before purchase"}
      </h2>
      <div
        className={
          isPurchased
            ? "opacity registered-event-section"
            : "no-opacity registered-event-section"
        }
      >
        <p className="titel registered-event-section-item">
          Name of the Venue:{" "}
          <span className="registered-event-title">
            {event.name.text.toUpperCase()}
          </span>
        </p>
        <p className="registered-event-section-item">
          Start: {new Date(event.start.utc).toLocaleString()}
        </p>
        <p className="registered-event-section-item">
          {" "}
          End: {new Date(event.end.utc).toLocaleString()}
        </p>
        <p className="registered-event-section-item">
          Venue: {venue ? venue.name : "To be announced soon"}
        </p>
        <p className="registered-event-section-item">
          Tickets you chose: {ticketsToBuy}
        </p>
        <p className="registered-event-section-item">
          Cost per ticket - {ticketsCost}
        </p>
        <p className="registered-event-section-item">
          Your total - £{ticketsToBuy * ticketsCost}
        </p>
        <button
          onClick={handlePurchase}
          disabled={isClicked}
          className={
            isClicked
              ? "grey registered-event-section-item"
              : "purchase-button registered-event-section-item"
          }
        >
          Purchase
        </button>
      </div>
      {isPurchased ? (
        <div
          id="add-google-calendar-container"
          className={isPurchased ? "no-opacity" : null}
        >
          <p className="green">
            Thank you! Your purchase has been successful!{" "}
          </p>
          <p>Do you want to add this event to your calendar?</p>
          <AddToCalendar RegisteredEvent={event} venue={venue} />
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : null}
    </div>
  );
};

export default RegisterForEvent;
