import React from "react";

// Helper function to format dates as Google Calendar requires (YYYYMMDDTHHmmSSZ)
function formatDateForCalendar(date) {
  return new Date(date).toISOString().replace(/-|:|\.\d+/g, "");
}

const AddEventToCalendar = ({ RegisteredEvent }) => {
  const eventTitle = RegisteredEvent.name.text;
  const title = eventTitle;
  const startTime = RegisteredEvent.start ? RegisteredEvent.start.utc : null; // Example start time in UTC
  const endTime = RegisteredEvent.end ? RegisteredEvent.end.utc : null; // Example end time in UTC
  const details = RegisteredEvent.description
    ? RegisteredEvent.description.text
    : null;

  // Format dates
  const formattedStartTime = formatDateForCalendar(startTime);
  const formattedEndTime = formatDateForCalendar(endTime);

  // Construct the Google Calendar URL
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&dates=${formattedStartTime}/${formattedEndTime}&details=${encodeURIComponent(
    details
  )}`;

  return (
    <a
      href={googleCalendarUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="add-event-to-calendar-button"
    >
      Add to Google Calendar
    </a>
  );
};

export default AddEventToCalendar;
