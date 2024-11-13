import React, { useEffect, useMemo, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  fetchAllCategories,
  postAnEvent,
  postTicketClass,
  postVenue,
} from "../../apis";
import CelebrationIcon from "@mui/icons-material/Celebration";
import countryList from "react-select-country-list";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ErrorPage from "./ErrorPage";
import LoaderSpinner from "./LoaderSpinner";

const AddEventPage = () => {
  const { userDetails, currentUser } = useAuth();

  const formRef = useRef(null);

  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [venueName, setVenueName] = useState("");
  const [addEventCategoryId, setAddEventCategoryId] = useState(null);
  const defaultTimezone = "Europe/London";
  const [ticketClass, setTicketClass] = useState("General Admission");
  const [ticketQuantity, setTicketQuantity] = useState(0);
  const [ticketCost, setTicketCost] = useState(0.0);
  const [isDonation, setIsDonation] = useState(false);
  const [isFree, setIsFree] = useState(false);
  const [venueAddress1, setVenueAddress1] = useState("");
  const [venueAddress2, setVenueAddress2] = useState("");
  const [venueCity, setVenueCity] = useState("");
  const [venueCountry, setVenueCountry] = useState("GB");
  const [successMessage, setSuccessMessage] = useState("");
  const [venueNameError, setVenueNameError] = useState("");
  const [eventNameError, setEventNameError] = useState("");
  const [inputErrorMessage, setInputErrorMessage] = useState("");
  const [desciptionError, setDescriptionError] = useState("");
  const [addressChangeError, setAddressChangeError] = useState("");
  const [cityChangeError, setCitychangeError] = useState("");
  const restrictedChars = /[#$%^&*()_+={}\[\]"'<>/\\|`~£]/;
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const utcStartDate = startDate
    ? startDate.toISOString().split(".")[0] + "Z"
    : null;
  const utcEndDate = endDate ? endDate.toISOString().split(".")[0] + "Z" : null;

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
    ticketDonation: isDonation,
    ticketFree: isFree

  };

  useEffect(() => {
    setIsLoading(true);
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

  //restrict user from typing certain characters
  const handleKeyDown = (e) => {
    // Check if the key pressed is a restricted character
    if (restrictedChars.test(e.key)) {
      e.preventDefault(); // Block the input
    }
  };

  //handle input changes

  const validateEventNameInput = (e) => {
    const value = e.target.value;
    e.preventDefault();
    if (value.trim().length < 1) {
      setEventNameError(
        "Event name cannot be empty or start with a whitespace"
      );
      setEventName("");
    } else {
      setEventNameError("");
      setInputErrorMessage("");
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
      setInputErrorMessage("");
      setVenueName(value.trim());
    }
  };

  // handle Event Description change
  const handleEventDescriptionChange = (e) => {
    const value = e.target.value;

    if (value.trim().length < 1) {
      setDescriptionError(
        "Description field cannot be empty or start with a whitespace"
      );
      setEventDescription("");
    } else {
      setDescriptionError("");
      setInputErrorMessage("");
      setEventDescription(value.trim());
    }
  };

  //handle Address Change
  const validateAdressInput = (e) => {
    const value = e.target.value;

    if (value.trim().length < 1) {
      setAddressChangeError(
        "Address field cannot be empty or start with a whitespace"
      );
      setVenueAddress1("");
    } else {
      setAddressChangeError("");
      setInputErrorMessage("");
      setVenueAddress1(value.trim());
    }
  };

  // validate City Input

  const validateCityInput = (e) => {
    const value = e.target.value;

    if (value.trim().length < 1) {
      setCitychangeError(
        "City field cannot be empty or start with a whitespace"
      );
      setEventDescription("");
    } else {
      setCitychangeError("");
      setInputErrorMessage("");
      setVenueCity(value.trim());
    }
  };

// handle ticket class change

const handleTicketClassChange = (e) => {
  e.preventDefault();
  const ticketClassName =  e.target.value;
  if(ticketClassName === "General Admission"){
    setIsDonation(false);
    setIsFree(false);
    setTicketClass(ticketClassName);
  }
  else if (ticketClassName === "Donation"){
    setIsDonation(true);
    setIsFree(false);
    setTicketClass(ticketClassName);
  }
  else {
    setIsDonation(false);
    setIsFree(true);
    setTicketClass(ticketClassName)
  }
}

  // handle add event click - form submission
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setInputErrorMessage("");
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
      setInputErrorMessage(
        "Event name cannot be blank or contain only whitespace."
      );
      return;
    }

    if (venueName.trim().length < 1) {
      setInputErrorMessage("Venue name cannot be blank");
      return;
    }
    if (venueAddress1.trim().length < 1) {
      setInputErrorMessage("Address cannot be blank");
      return;
    }
    if (venueCity.trim().length < 1) {
      setInputErrorMessage("City cannot be blank");
      return;
    }
    setError(null);
    setIsLoading(true);
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
        setTicketClass(data);
        alert("Form submitted successfully");
        if (formRef.current) {
          // Ensuring formRef is not null before calling reset
          formRef.current.reset();
        }
        setSuccessMessage("Event Added Successfully!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 1000);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
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
      {successMessage && (
        <p className="success-message">
          {successMessage} <CelebrationIcon style={{ color: "orange" }} />
        </p>
      )}
      
      <p className="add-event-page-heading">
        <span className="wrapper">C</span>reate an event by filling the form
        below and clicking the
        <span className="create-event-text"> Create Event</span> button!
      </p>
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
            onKeyDown={handleKeyDown}
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
            minLength={20}
            maxLength={135}
            onChange={handleEventDescriptionChange}
            onKeyDown={handleKeyDown}
          />
          <span className="green">[ Word limit: Min - 20, Max - 135 ]</span>
          {desciptionError && (
            <p className="event-error-message">{desciptionError}</p>
          )}
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
              onChange={(date) => {
                setStartDate(date), setInputErrorMessage("");
              }}
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
              onChange={(date) => {
                setEndDate(date), setInputErrorMessage("");
              }}
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
              onKeyDown={handleKeyDown}
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
                onChange={validateAdressInput}
                onKeyDown={handleKeyDown}
              />
            </label>
            {addressChangeError && (
              <p className="event-error-message">{addressChangeError}</p>
            )}
          </div>
          <label className="event-label-section">
            <span className="event-label">City</span>
            <input
              type="text"
              placeholder="city"
              autoComplete="on"
              required
              className="add-event-form-input reduced-width"
              onChange={validateCityInput}
              onKeyDown={handleKeyDown}
            />
          </label>
          {cityChangeError && (
            <p className="event-error-message">{cityChangeError}</p>
          )}
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
              required
              onChange={handleTicketClassChange}
              // onChange={(e) => setTicketClass(e.target.value)}
            >
              <option>Choose a ticket Class</option>
              <option value={"General Admission"}>General Admission</option>
              <option value={"Donation"}>Donation</option>
              <option value={"Free"}>Free</option>
            </select>
          </label>
          {isDonation || isFree ?  null :
          <label className="event-label-section">
            <span className="event-label">
              How much would you like to charge? (£){" "}
            </span>
            <input
              className="add-event-form-input reduced-width"
              type="number"
              placeholder="0"
              min={0}
              max={100}
              required
              onChange={(e) => setTicketCost(parseInt(e.target.value))}
            />
          </label>  
}

          <label className="event-label-section">
            <span className="event-label">
              What's the capacity for your event?
            </span>
            <input
              className="add-event-form-input reduced-width"
              type="number"
              placeholder="0"
              min={0}
              max={1000}
              required
              onChange={(e) => setTicketQuantity(parseInt(e.target.value))}
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
          disabled={
            eventNameError ||
            venueNameError ||
            desciptionError ||
            cityChangeError ||
            addressChangeError ||
            inputErrorMessage
              ? true
              : false
          }
        />
      </form>
    </div>
  );
};

export default AddEventPage;
