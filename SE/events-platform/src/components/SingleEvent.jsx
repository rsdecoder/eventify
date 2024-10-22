import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEventById, fetchVenueById } from "../../apis";

const SingleEvent = () => {
  const [eventData, setEventData] = useState({});
  const [error, setError] = useState(null);
  const { event_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEventById(event_id)
      .then((event) => {
        setEventData(event);
        if(event.venue_id){
            fetchVenueById(event.venue_id)
            .then((venue) => {
                
            })
        } 
        setIsLoading(false);

      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [event_id]);

  if (isLoading) {
    return <p>loading event details...!</p>;
  }
  if (error) {
    return <p>{error.response.data.error_description}</p>;
  }
  return (
    <div id="single-event-page">
      {eventData && eventData.name && eventData.name.text ? (
        <div>
          <h1>{eventData.name.text}</h1>
          <p>
            {eventData.description
              ? eventData.description.text
              : "No description available"}
          </p>
          <p>
            Start: {new Date(eventData.start.utc).toLocaleString()} <br />
            End: {new Date(eventData.end.utc).toLocaleString()}
          </p>
          <p>
            Location:{" "}
            {eventData.venue_id ? "Venue ID: " + eventData.venue_id : "Online"}
          </p>
          <div>
            
          </div>

        </div>
      ) : (
        <p>Event details are not available.</p>
      )}
    </div>
  );
};

export default SingleEvent;
