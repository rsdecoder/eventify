import React, { useEffect, useState } from "react";
import { fetchTicketClassByEventId, fetchVenueById } from "../../apis";
import { Link, useNavigate } from "react-router-dom";
import PlaceIcon from "@mui/icons-material/Place";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { ConfirmationNumber } from "@mui/icons-material";
const EventShowCard = ({ event }) => {
  const { id, name, capacity, summary, start, end, venue_id, category_id } =
    event;
  const formattedStartDate = new Date(start.utc).toLocaleString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedendDate = new Date(end.utc).toLocaleString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const [tickets, setTickets] = useState({});
  const [venue, setVenue] = useState({});
  useEffect(() => {
    if (venue_id) {
      fetchVenueById(venue_id).then((data) => {
        setVenue({ ...data });
      });
    } else {
      setVenue({});
    }
    fetchTicketClassByEventId(id).then((data) => {
      setTickets({ ...data });
    });
  }, []);

  return (
    <div className="event-card">
      <div className="event-details-container">
        <p className="event-title">
          {name.text[0].toUpperCase() + name.text.slice(1)}
        </p>
        <div className="event-detail event-timestamp">
          <p>{formattedStartDate}</p>
        </div>
        <div className="venue-tickets-section">
          {venue ? (
            <div className="event-detail location">
              <div>
                <PlaceIcon />
                <p>Venue</p>
              </div>
              {venue.address ? (
                <div className="event-detail event-venue">
                  <p className="event-detail">{venue.name}</p>
                  {venue.address.city ? (
                    <p className="event-detail">{venue.address.city}</p>
                  ) : null}
                  {venue.address.country ? (
                    <p className="event-detail">{venue.address.country}</p>
                  ) : null}
                </div>
              ) : (
                <div className="event-detail event-venue">
                  <p className="event-detail">To be announced!</p>
                </div>
              )}
            </div>
          ) : (
            <p className="event-detail">To be announced soon!</p>
          )}
          <div className="event-detail ">
            <ConfirmationNumberIcon />
            {tickets ? (
              <div className="event-detail">
                {tickets.display_name ? (
                  <p>{tickets.display_name}</p>
                ) : (
                  <p>Tickets unavailable</p>
                )}
                {tickets.cost ? <p>{tickets.cost.display}</p> : null}
              </div>
            ) : (
              <p className="event-detail">tickets Unavailable</p>
            )}
          </div>
        </div>
      </div>
      <Link to={`/events/${id}`}>
        <button className="view-more-button">View More</button>
      </Link>
    </div>
  );
};

export default EventShowCard;
