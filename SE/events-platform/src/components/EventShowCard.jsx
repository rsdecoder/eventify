import React, { useEffect, useState } from "react";
import { fetchVenueById } from "../../apis";
import { Link, useNavigate } from "react-router-dom";
import PlaceIcon from "@mui/icons-material/Place";
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

  const [venue, setVenue] = useState({});
  useEffect(() => {
    if (venue_id) {
      fetchVenueById(venue_id).then((data) => {
        setVenue({ ...data });
      });
    } else {
      setVenue({});
    }
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
        {venue ? (
          <div className="event-detail location">
            <PlaceIcon />
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
      </div>
      <Link to={`/events/${id}`}>
        <button className="view-more-button">View More</button>
      </Link>
    </div>
  );
};

export default EventShowCard;
