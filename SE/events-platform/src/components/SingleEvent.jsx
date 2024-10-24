import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchEventById,
  fetchTicketClassByEventId,
  fetchVenueById,
} from "../../apis";
import "./SingleEvent.css";
import PlaceIcon from "@mui/icons-material/Place";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

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
          <h1 className="single-event-title  single-event-item">
            {eventData.name.text}
          </h1>
          <p className="event-summary  single-event-item">
            {eventData.summary
              ? eventData.summary
              : "No description available for this event."}
          </p>
          <div className="date-time-section  single-event-item">
            <p className="date-time-heading">Date and Time</p>
            <div className="date-and-time-items">
              <p className="date-">
                {new Date(eventData.start.utc).toLocaleString("en-GB", {
                  weekday: "long",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                -{" "}
                {new Date(eventData.end.utc).toLocaleString("en-GB", {
                  weekday: "long",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
              </p>
            </div>
          </div>
          <div className="single-venue-section  single-event-item">
            <div className="single-venue-section-heading">
              <PlaceIcon className="single-venue-item icon" />
              <p className="single-venue-item">Venue</p>
            </div>
            {venue.address ? (
              <div className="single-venue-address">
                <p>{venue ? `${venue.name}` : "To be announced soon"}</p>
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
          <div className="single-venue-section single-venue-item">
            <div className="single-venue-section-heading ticket-color">
              <ConfirmationNumberIcon className="single-venue-item icon" />
              <p className="single-venue-item">Tickets</p>
            </div>
          </div>
          {ticketDetails ? (
            <div className="single-ticket-info">
              <p className="single-ticket-item">
                {ticketDetails.display_name
                  ? `${ticketDetails.display_name}: `
                  : "General Admission"}
              </p>
              <p className="single-ticket-item">
                {ticketDetails.cost ? `${ticketDetails.cost.display}` : null}
              </p>
            </div>
          ) : (
            <p>Ticket Information not available at the moment</p>
          )}
          <form
            id="add-tickets"
            className="single-event-item"
            onSubmit={handleBuyTickets}
          >
            <label className="ticket-label">
              How many tickets would you like to buy?
              <input
                type="number"
                placeholder="0"
                default={0}
                min={1}
                max={ticketDetails ? ticketDetails.capacity : 20}
                required
                className="ticket-input"
                onChange={(e) => setTicketsToBuy(e.target.value)}
              />
            </label>
            <input type="submit" className="ticket-submit" value="Buy Tickets" />
          </form>
        </div>
      ) : (
        <p>Event details are not available.</p>
      )}
    </div>
  );
};

export default SingleEvent;
