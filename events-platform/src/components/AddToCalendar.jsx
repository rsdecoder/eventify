import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import "./AddtoCalendar.css";
import { useNavigate } from "react-router-dom";
// env variables
const env = process.env;
const googleClientId = env.REACT_APP_GOOGLE_CLIENT_ID;
const googleAPIKey = env.REACT_APP_GOOGLE_API_KEY;

//google client information
const CLIENT_ID = googleClientId;
const API_KEY = googleAPIKey;
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

// Add to calendar function

function AddToCalendar({ RegisteredEvent, venue }) {
  const navigate = useNavigate();

  const event_name = RegisteredEvent.name.text;
  const eventDescription = RegisteredEvent.description.text;
  const address1 = venue.address? venue.address.address_1 : "";
  const address2 = venue.address? venue.address.address_2 : "";
  const city = venue.address? venue.address.city: "";
  const country = venue.address? venue.address.country: "";
  const eventLocation = address1+" "+address2+" "+city+" "+country;
  const startTime = RegisteredEvent.start.local;
  const endTime = RegisteredEvent.end.local;
  const eventStartTimezone = RegisteredEvent.start.timezone;
  const eventEndTimeZone = RegisteredEvent.end.timezone;
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  const handleAuthClick = () => {
    gapi.auth2
      .getAuthInstance()
      .signIn()
      .then(() => {
        setIsSignedIn(true);
        alert("You are now signed in!");
      });
  };

  const handleSignOutClick = () => {
    gapi.auth2
      .getAuthInstance()
      .signOut()
      .then(() => {
        setIsSignedIn(false);
        alert("You are signed out");
        navigate("/");
      });
  };

  const addEventToCalendar = async () => {
    if (!gapi.client.calendar) {
      console.error('GAPI client not loaded yet.');
      return;
    }
    const event = {
      summary: RegisteredEvent ? RegisteredEvent.name.text : null, 
      description: eventDescription,
      start: {
        dateTime: startTime, 
        timeZone: eventStartTimezone,
      },
      end: {
        dateTime: endTime, 
        timeZone: eventEndTimeZone,
      },
    };
    try {
      const response = await gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
      });
      alert("Event added to the calendar successfully!");
    } catch (error) {
      alert("Sorry, failed adding the event.");
    }
  };

  return (
    <div className="google-login">
      {isSignedIn ? (
        <div className="Calendar">
          <button
            onClick={handleSignOutClick}
            className="sign-out-button calendar-button"
          >
            Sign Out
          </button>
          <button
            onClick={addEventToCalendar}
            className="calendar-add-button calendar-button"
          >
            Add Event to Google Calendar
          </button>
        </div>
      ) : (
        <button
          onClick={handleAuthClick}
          className="sign-in-button calendar-button"
        >
          Sign In with Google
        </button>
      )}
      <a href="/privacy-policy"><button>Privacy Policy</button></a>
    </div>
  );
}

export default AddToCalendar;
