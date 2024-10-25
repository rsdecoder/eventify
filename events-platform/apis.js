import axios from "axios";
const env = process.env;
const eventbriteOrganizationId = env.REACT_APP_EVENTBRITE_ORGANIZATION_ID;
const eventbriteToken = env.REACT_APP_EVENTBRITE_API_TOKEN;

const eventsApi = axios.create({
  baseURL: "https://www.eventbriteapi.com/v3",
});

//fetching all categories from eventbrite api

export const fetchAllCategories = () => {
  return eventsApi
    .get("/categories/", {
      headers: {
        Authorization: `Bearer ${eventbriteToken}`,
      },
    })
    .then((response) => {
      return response.data.categories;
    });
};

//fetchAllEvents

export const fetchAllEvents = () => {
  return eventsApi
    .get(`/organizations/${eventbriteOrganizationId}/events/`, {
      headers: {
        Authorization: `Bearer ${eventbriteToken}`,
      },
    })
    .then((response) => {
      return response.data.events;
    });
};

// fetchEventById

export const fetchEventById = (event_id) => {
  return eventsApi
    .get(`/events/${event_id}/`, {
      headers: {
        Authorization: `Bearer ${eventbriteToken}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

//fetchVenues

export const fetchVenueById = (venue_id) => {
  return eventsApi
    .get(`/venues/${venue_id}/`, {
      headers: {
        Authorization: `Bearer ${eventbriteToken}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

// post/create an event to an organization

export const postAnEvent = (eventDetails, venue_id) => {
  const postBody = {
    "event.name.html": eventDetails.event_name,
    "event.description.html": eventDetails.event_description,
    "event.start.utc": eventDetails.event_startDate,
    "event.start.timezone": eventDetails.event_timezone,
    "event.end.utc": eventDetails.event_endDate,
    "event.end.timezone": eventDetails.event_timezone,
    "event.currency": "GBP",
    "event.venue_id": venue_id,
    "event.online_event": false,
    "event.listed": false,
  };
  return eventsApi
    .post(`/organizations/${eventbriteOrganizationId}/events/`, postBody, {
      headers: {
        Authorization: `Bearer ${eventbriteToken}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    });
};

//post a venue while creating event

export const postVenue = (venueDetails) => {
  const postBody = {
    "venue.name": venueDetails.venue_name,
    "venue.address.address_1": venueDetails.venue_address1,
    "venue.address.address_2": venueDetails.venue_address2,
    "venue.address.city": venueDetails.venue_city,
    "venue.address.country": venueDetails.venueCountry,
  };
  return eventsApi
    .post(`/organizations/${eventbriteOrganizationId}/venues/`, postBody, {
      headers: {
        Authorization: `Bearer ${eventbriteToken}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    });
};

// Post ticket class for an event /events/event_id/ticketClass

export const postTicketClass = (eventId, ticketDetails) => {
  const postBody = {
    "ticket_class.description": ticketDetails.ticketName,
    "ticket_class.cost": ticketDetails.ticketCost,
    "ticket_class.capacity": ticketDetails.ticketQuantity,
    "ticket_class.name": "General Admission",
  };

  return eventsApi
    .post(`/events/${eventId}/ticket_classes/`, postBody, {
      headers: {
        Authorization: `Bearer ${eventbriteToken}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    });
};

//GET Ticketclass for an event

export const fetchTicketClassByEventId = (event_id) => {
  return eventsApi
    .get(`/events/${event_id}/ticket_classes/`, {
      headers: {
        Authorization: `Bearer ${eventbriteToken}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data.ticket_classes[0];
    });
};
