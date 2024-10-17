// src/components/CreateEvent.js
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
useAuth

const CreateEvent = () => {
  const { currentUser, role } = useAuth();
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [venueId, setVenueId] = useState(""); // Optional
  const [message, setMessage] = useState("");

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      // Fetch user's organization ID from Firestore or other logic
      const organizationId = "your_eventbrite_organization_id";

      // Construct event details as per Eventbrite API requirements
      const eventDetails = {
        "event.name.html": eventName,
        "event.description.html": description,
        "event.start.utc": new Date(startDate).toISOString(),
        "event.start.timezone": "UTC", // Adjust timezone as needed
        "event.end.utc": new Date(endDate).toISOString(),
        "event.end.timezone": "UTC", // Adjust timezone as needed
        "event.currency": currency,
        "event.online_event": false,
        // "event.venue_id": venueId, // Uncomment if using a venue
      };

      // Get Eventbrite token securely
      const token = "your_eventbrite_access_token"; // Ideally, fetch this securely

      // Call Cloud Function
      const response = await axios.post("https://YOUR_CLOUD_FUNCTION_URL/createEvent", {
        token,
        organizationId,
        eventDetails,
      });

      setMessage("Event created successfully!");
    } catch (error) {
      console.error("Error creating event:", error.response ? error.response.data : error.message);
      setMessage("Error creating event.");
    }
  };

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={handleCreateEvent}>
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          {/* Add more currencies as needed */}
        </select>
        {/* Optional: Add venue selection */}
        {/* <input
          type="text"
          placeholder="Venue ID"
          value={venueId}
          onChange={(e) => setVenueId(e.target.value)}
        /> */}
        <button type="submit">Create Event</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateEvent;
