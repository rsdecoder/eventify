import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchEventById,
  fetchTicketClassByEventId,
  fetchVenueById,
} from "../../apis";
import "./SingleEvent.css";

const SingleEvent = () => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({});
  const [ticketsToBuy, setTicketsToBuy] = useState(0);
  const [venue, setVenue] = useState({});
  const [ticketDetails, setTicketDetails] = useState({});
  const [error, setError] = useState(null);
  const { event_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEventById(event_id)
      .then((event) => {
        setEventData(event);
        if (event.venue_id) {
          fetchVenueById(event.venue_id)
            .then((venue) => {
              setVenue(venue);
            })
            .catch((err) => {
              setError(err);
            });
        } else {
          setVenue({});
        }
        setIsLoading(false);
      })
      .then(() => {
        fetchTicketClassByEventId(event_id)
          .then((response) => {
            setTicketDetails(response);
          })
          .catch((err) => {
            setError(err);
          });
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [event_id]);

  const handleBuyTickets = (e) => {
    e.preventDefault();
    navigate("/register-event/", {
      state: { event: eventData, tickets: ticketsToBuy, venue: venue },
    });
  };

  if (isLoading) {
    return <p>loading event details...!</p>;
  }
  if (error) {
    return <p>{error.response.data.error_description}</p>;
  }
  return (
    <div id="single-event-page">
      {eventData && eventData.name && eventData.name.text ? (
        <div className="single-event-information">
          <h1 className="single-event-title">{eventData.name.text}</h1>
          <p>
            {eventData.description
              ? eventData.description.text
              : "No description available"}
          </p>
          <p>
            Start: {new Date(eventData.start.utc).toLocaleString()} <br />
            End: {new Date(eventData.end.utc).toLocaleString()}
          </p>
          <div>
            <h4>Venue</h4>
            <p>{venue ? `${venue.name}` : "To be announced soon"}</p>
            {venue.address ? (
              <div>
                <p>
                  {venue.address.address_1 ? venue.address.address_1 : null}
                </p>
                <p>
                  {venue.address.address_2 ? venue.address.address_2 : null}
                </p>
                <p>{venue.address.city ? venue.address.city : null}</p>
                <p>{venue.address.country ? venue.address.country : null}</p>
              </div>
            ) : (
              <p>To be announced soon</p>
            )}
          </div>
          {ticketDetails ? (
            <div>
              <h4>Tickets</h4>
              <p>
                {ticketDetails.display_name
                  ? `${ticketDetails.display_name}: `
                  : "General Admission"}
              </p>
              <p>
                {ticketDetails.cost ? `${ticketDetails.cost.display}` : null}
              </p>
            </div>
          ) : (
            <p>Ticket Information not available at the moment</p>
          )}
          <form id="add-tickets" onSubmit={handleBuyTickets}>
            <label>
              How many tickets would you like to buy?
              <input
                type="number"
                min={1}
                max={ticketDetails ? ticketDetails.capacity : 20}
                required
                onChange={(e) => setTicketsToBuy(e.target.value)}
              />
              <input type="submit" value="Buy Tickets" />
            </label>
          </form>
        </div>
      ) : (
        <p>Event details are not available.</p>
      )}
    </div>
  );
};

export default SingleEvent;
