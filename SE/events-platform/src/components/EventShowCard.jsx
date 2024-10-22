import React, { useEffect, useState } from "react";
import { fetchVenueById } from "../../apis";
import { Link, useNavigate } from "react-router-dom";

const EventShowCard = ({ event }) => {
  const { id, name, capacity, description, start, end, venue_id, category_id } =
    event;
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
        <h3 className="event-title">{name.text}</h3>
        <p>{description.text}</p>
        <div>
          <p>Starts at {start.utc}</p>
          <p>Ends at {end.utc}</p>
        </div>
        <p>Venue Capacity {capacity}</p>
        {venue ? (
          <div>
            <p>{venue.name}</p>
            <h5>Venue Address</h5>
            {venue.address ? (
              <div>
                <p>{venue.address.address_1}</p>
                <p>{venue.address.address_2}</p>
                <p>{venue.address.city}</p>
                <p>{venue.address.country}</p>
                <p>
                  {venue.address.postal_code ? venue.address.postal_code : null}
                </p>
              </div>
            ) : (
              <p>To be announced!</p>
            )}
          </div>
        ) : (
          <p>To be announced soon!</p>
        )}
      </div>
      <Link to={`/events/${id}`}>
        <button>View More</button>
      </Link>
    </div>
  );
};

export default EventShowCard;
