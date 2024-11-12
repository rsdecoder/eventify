import React, { useEffect, useMemo, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  fetchAllCategories,
  postAnEvent,
  postTicketClass,
  postVenue,
} from "../../apis";
import CurrencyInput from "react-currency-input-field";
import countryList from "react-select-country-list";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ErrorPage from "./ErrorPage";
import LoaderSpinner from "./LoaderSpinner";

const AddEventPage = () => {
  const { userDetails, currentUser } = useAuth();

  const formRef = useRef(null);

  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [eventName, setEventName] = useState("");
  const [eventNameError, setEventNameError] = useState("");
  const [inputErrorMessage, setInputErrorMessage] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [venueName, setVenueName] = useState("");
  const [addEventCategoryId, setAddEventCategoryId] = useState(null);
  const defaultTimezone = "Europe/London";
  const [ticketClass, setTicketClass] = useState("General Admission");
  const [ticketQuantity, setTicketQuantity] = useState(0);
  const [ticketCost, setTicketCost] = useState(0.0);
  const [venueAddress1, setVenueAddress1] = useState("");
  const [venueAddress2, setVenueAddress2] = useState("");
  const [venueCity, setVenueCity] = useState("");
  const [venueCountry, setVenueCountry] = useState("GB");
  const [successMessage, setSuccessMessage] = useState("");
  const [venueNameError, setVenueNameError] = useState("");

  const utcStartDate = startDate
    ? startDate.toISOString().split(".")[0] + "Z"
    : null;
  const utcEndDate = endDate ? endDate.toISOString().split(".")[0] + "Z" : null;
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //filter passed time slots
  const filterEndTime = (time) => {
    if (!startDate) return true;
    const selectedEndTime = new Date(time);
    return selectedEndTime > startDate;
  };

  // country list for venue country
  const options = useMemo(() => countryList().getData(), []);

  const venueDetails = {
    venue_name: venueName,
    venue_address1: venueAddress1,
    venue_address2: venueAddress2,
    venue_city: venueCity,
    venue_country: venueCountry,
  };
  const eventDetails = {
    event_name: eventName,
    event_description: eventDescription,
    event_startDate: utcStartDate,
    event_timezone: defaultTimezone,
    event_endDate: utcEndDate,
    event_currency: "GBP",
    event_is_online: false,
    event_category_id: addEventCategoryId,
  };

  const ticketClassDetails = {
    ticketName: ticketClass,
    ticketQuantity: ticketQuantity,
    ticketCost: `GBP,${ticketCost * 100}`,
  };

  useEffect(() => {
    fetchAllCategories()
      .then((categories) => {
        setCategories(categories);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(true);
      });
  }, []);

  //handle input changes

  const validateEventNameInput = (e) => {
    const value = e.target.value;

    if (value.trim().length < 1) {
      setEventNameError(
        "Event name cannot be empty or start with a whitespace"
      );
      setEventName(value.trim());
    } else {
      setEventNameError("");
      setEventName(value.trim());
    }
  };

  //handle Venue Input changes 

  const validateVenueNameInput = (e) => {
    const value = e.target.value;

    if (value.trim().length < 1) {
      setVenueNameError(
        "Venue name cannot be empty or start with a whitespace"
      );
      setVenueName(value.trim());
    } else {
      setVenueNameError("");
      setVenueName(value.trim());
    }
  };

  // handle add event click
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage("");
    // Reset error before submitting
    setError(null);

    const now = new Date();
    const start = new Date(utcStartDate);
    const end = new Date(utcEndDate);

    if (start <= now || end <= now) {
      setInputErrorMessage("Start and end dates must be in the future.");
      return;
    }

    if (eventName.length < 1) {
      setInputErrorMessage("Event name cannot be empty or contain only whitespace.");
      return;
    }
    if (venueName.trim().length < 1) {
      setInputErrorMessage("Venue name cannot be empty");
      return;
    }
    setError(null);
    postVenue(venueDetails)
      .then((data) => {
        const venue_id = data.id;
        return venue_id;
      })
      .then((venue_id) => {
        const eventId = postAnEvent(eventDetails, venue_id).then((data) => {
          const event_id = data.id;
          return event_id;
        });
        return eventId;
      })
      .then((eventId) => {
        postTicketClass(eventId, ticketClassDetails).then((data) => {
          return data;
        });
      })
      .then((data) => {
        setIsLoading(true);
        setTicketClass(data);
        // alert("Event and ticketclass added successfully!");
        setSuccessMessage("Event and Ticket Class added successfully!");
        // Auto-hide the success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
        formRef.current.reset();
      })
      .catch((err) => {
        setError(err.message);
        console.log(err);
        setIsLoading(false);
      });
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoaderSpinner message="Adding your event to the database" />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }
  if (userDetails.role !== "staff") {
    return <ErrorPage error={"You are not authroised to access this page!"} />;
  }
  return (
    <div id="add-event-page">
      <p className="add-event-page-heading">
        <span className="wrapper">C</span>reate an event by filling the form
        below and clicking the
        <span className="create-event-text"> Create Event</span> button!
      </p>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form
        ref={formRef}
        id="event-form"
        method="post"
        onSubmit={handleCreateEvent}
      >
        <h4 className="add-event-form-heading">
          Please enter the event details here.
        </h4>
        <label className="event-label-section">
          <span className="event-label">Give your Event a Name </span>
          <input
            type="text"
            placeholder="Event name"
            name="event-name"
            autoComplete="on"
            className="add-event-form-input reduced-width"
            required
            onChange={validateEventNameInput}
            // onChange={(e) => setEventName(e.target.value.trim())}
          />
          {eventNameError && (
            <p className="event-error-message">{eventNameError}</p>
          )}
        </label>
        <label className="event-label-section">
          <span className="event-label">Describe your event</span>
          <textarea
            type="text"
            placeholder="Event Description"
            name="event-description"
            autoComplete="on"
            className="add-event-form-input add-event-form-text-area"
            required
            minLength={50}
            onChange={(e) => setEventDescription(e.target.value.trim())}
          />
          <span className="green">[ Word limit: Min - 50 ]</span>
        </label>
        <label className="event-label-section">
          <span className="event-label">Choose an appropriate Category </span>
          <select
            className="add-event-form-input reduced-width custom-select"
            onChange={(e) => setAddEventCategoryId(e.target.value)}
          >
            <option>Choose a Category</option>
            {categories.map((category) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.short_name}
                </option>
              );
            })}
          </select>
        </label>
        <div className="event-calendar-section">
          <label className="event-label-section">
            <span className="event-label">When does the event start? </span>
            <DatePicker
              dateFormat="MMMM d, yyyy h:mm aa"
              selectsStart
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              timeInputLabel="Time:"
              isClearable
              minDate={new Date()}
              filterTime={(time) => new Date(time) > new Date()}
              placeholderText="Pick a start date!"
              withPortal
              showIcon
              required
              className="add-event-form-input reduced-width date-picker"
            />
          </label>
          <label className="event-label-section">
            <span className="event-label">When does the event end? </span>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              showTimeSelect
              timeInputLabel="Time:"
              dateFormat="MMMM d, yyyy h:mm aa"
              selectsEnd
              minDate={startDate ? startDate : new Date()}
              filterTime={filterEndTime}
              isClearable
              placeholderText="Pick an end date!"
              withPortal
              showIcon
              required
              className="add-event-form-input reduced-width date-picker"
            />
          </label>
        </div>
        <h4 className="add-event-form-heading">
          Please enter the venue details here.
        </h4>
        <div className="venue">
          <label className="event-label-section">
            <span className="event-label">Name of the Venue</span>
            <input
              type="text"
              placeholder="Name of the Venue"
              name="venue-name"
              autoComplete="on"
              className="add-event-form-input venue-input reduced-width"
              required
              onChange={validateVenueNameInput}
            />
          </label>
          {venueNameError && (
            <p className="event-error-message">{venueNameError}</p>
          )}
          <p className="venue-address-heading">Address</p>
          <div className="venue-address">
            <label className="event-label-section">
              <span className="event-label">
                address (street name, building name){" "}
              </span>
              <input
                type="text"
                placeholder="building name"
                autoComplete="on"
                required
                className="add-event-form-input reduced-width"
                onChange={(e) => setVenueAddress1(e.target.value)}
              />
            </label>
            {/* <label className="event-label-section">
              <span className="event-label">address line 2</span>
              <input
                type="text"
                placeholder="street, county"
                autoComplete="on"
                className="add-event-form-input venue-input"
                onChange={(e) => setVenueAddress2(e.target.value)}
              />
            </label> */}
          </div>
          <label className="event-label-section">
            <span className="event-label">City</span>
            <input
              type="text"
              placeholder="city"
              autoComplete="on"
              required
              className="add-event-form-input reduced-width"
              onChange={(e) => setVenueCity(e.target.value)}
            />
          </label>
          <label className="event-label-section">
            <span className="event-label">Country</span>
            <select
              className="add-event-form-input reduced-width"
              required
              onChange={(e) => setVenueCountry(e.target.value)}
            >
              {options.map((country, index) => {
                return (
                  <option key={index} value={country.value}>
                    {country.label}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
        <h4 className="add-event-form-heading">
          Please enter the ticket details here.
        </h4>
        <div className="ticket-class">
          <label className="event-label-section">
            <span className="event-label">Choose a ticket Class:</span>
            <select
              className="add-event-form-input reduced-width"
              defaultValue={"General Admission"}
              required
              onChange={(e) => setTicketClass(e.target.value)}
            >
              <option>General Admission</option>
              <option>Donation</option>
              <option>Free</option>
            </select>
          </label>
          <label className="event-label-section">
            <span className="event-label">
              How much would you like to charge? (£){" "}
            </span>
            <CurrencyInput
              className="add-event-form-input reduced-width"
              id="input-example"
              name="price"
              placeholder="Please enter a number"
              required
              defaultValue={0.0}
              decimalsLimit={2}
              onValueChange={(value, name, values) => setTicketCost(value)}
            />
          </label>

          <label className="event-label-section">
            <span className="event-label">
              What's the capacity for your event?
            </span>
            <input
              className="add-event-form-input reduced-width"
              type="number"
              placeholder="0"
              min={0}
              required
              onChange={(e) => setTicketQuantity(e.target.value)}
            />
          </label>
          {inputErrorMessage && (
            <p className="input-error-message">{inputErrorMessage}</p>
          )}
        </div>
        <input
          type="submit"
          value="Create Event"
          className="event-submit add-event-form-input"
        />
      </form>
    </div>
  );
};

export default AddEventPage;
