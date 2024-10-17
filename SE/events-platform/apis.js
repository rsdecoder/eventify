import axios from "axios";
import { EVENTBRITE_API_TOKEN } from "../events-platform/eventbrite/eventbriteToken.js";
import { eventbriteOrganizationId } from "./eventbrite/eventbriteOrganizationId.js";

const eventsApi = axios.create({
  baseURL: "https://www.eventbriteapi.com/v3",
});

//fetching all categories from eventbrite api

export const fetchAllCategories = () => {
  return eventsApi
    .get("/categories/", {
      headers: {
        Authorization: `Bearer ${EVENTBRITE_API_TOKEN}`,
      },
    })
    .then((response) => {
      return response.data.categories;
    });
};

// post/create an event to an organization

export const postAnEvent = (eventDetails) => {
  console.log(eventDetails, "inside apis");
  const postBody = {
    "event.name.html": eventDetails.event_name,
    "event.description.html": eventDetails.event_description,
    "event.start.utc": eventDetails.event_startDate,
    "event.start.timezone": eventDetails.event_timezone,
    "event.end.utc": eventDetails.event_endDate,
    "event.end.timezone": eventDetails.event_timezone,
    "event.currency": "GBP",
    // "event.logo_id": eventDetails.event_logoId,
    "event.online_event": false,
    "event.listed": false,
  };
  return eventsApi
    .post(`/organizations/${eventbriteOrganizationId}/events/`, postBody, {
      headers: {
        Authorization: `Bearer ${EVENTBRITE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    });
};

//post a venue while creating event

export const postVenue = (venueDetails) => {
  console.log(eventDetails, "inside apis");
  const postBody = {
    "venue.name": venueDetails.venueName,
    "venue.address": venueDetails.venueName,
  };
  return eventsApi
    .post(`/organizations/${eventbriteOrganizationId}/events/`, postBody, {
      headers: {
        Authorization: `Bearer ${EVENTBRITE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    });
};

