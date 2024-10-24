import React, { useEffect, useState } from "react";
import { fetchAllEvents } from "../../apis";
import EventShowCard from "./EventShowCard";
import { useSearchParams } from "react-router-dom";
import "./AllEvents.css";
import LoaderSpinner from "./LoaderSpinner";


const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [err, setErr] = useState(null);
  const categoryQuery = searchParams.get("category_id");
  const categoryName = searchParams.get("category_name");
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    setIsLoading(true);
    fetchAllEvents()
      .then((events) => {
        if (categoryQuery) {
          const filteredEvents = events.filter((event) => {
            return event.category_id === categoryQuery;
          });
          setFilteredEvents(filteredEvents);
          if (filteredEvents.length === 0) {
            setErr("Sorry, No events found in this category!");
          }
        }
        setEvents(events);
        setIsLoading(false)
      })
      .catch((err) => {
        setErr(err);
        setIsLoading(true);
      });
      setIsLoading(true);
  }, [categoryQuery]);

  if(isLoading) {
    return (<LoaderSpinner/>)
  }
   if (err) {
    return <p>{err}</p>;
  }
  return (
    <div id="all-events">
      <p className="events-heading">{categoryName? `Events filtered by ${categoryName}` : "All Events"}</p>
    <div id="events-container">
      {categoryQuery
        ? filteredEvents.map((event) => {
            return (
                <EventShowCard key={event.id} event={event} />
            );
          })
        : events.map((event) => {
            return <EventShowCard key={event.id} event={event} />;
          })}
    </div>
    </div>
  );
};

export default Events;
