import React, { useEffect, useState } from "react";
import { fetchAllEvents } from "../../apis";
import EventShowCard from "./EventShowCard";
import { useSearchParams } from "react-router-dom";
import "./AllEvents.css";
import LoaderSpinner from "./LoaderSpinner";
import ErrorPage from "./ErrorPage";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [err, setErr] = useState(null);
  const categoryQuery = searchParams.get("category_id");
  const categoryName = searchParams.get("category_name");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchAllEvents()
      .then((events) => {
        setEvents(events);
        setFilteredEvents(events);
        setIsLoading(false);
      })
      .catch((err) => {
        setErr(err);
        setIsLoading(true);
      });

    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (categoryQuery) {
      const filtered = events.filter(
        (event) => event.category_id === categoryQuery
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  }, [categoryQuery, events]);

  if (isLoading) {
    return <LoaderSpinner />;
  }
  if (err) {
    return <ErrorPage error={err} />;
  }
  return (
    <div id="all-events">
      <p className="events-heading">
        {categoryName ? `Events filtered by ${categoryName}` : "All Events"}
      </p>
      <div id="events-container">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => {
            return <EventShowCard key={event.id} event={event} />;
          })
        ) : (
          <p>No events found in this category!</p>
        )}
      </div>
    </div>
  );
};

export default Events;
