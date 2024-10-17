import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchAllCategories, postAnEvent } from "../../apis";
import CurrencyInput from "react-currency-input-field";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const AddEventPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [venueName, setVenueName] = useState("");
  const [addEventCategoryId, setAddEventCategoryId] = useState("");
  const defaultTimezone = "Europe/London";
  const [ticketClass, setTicketClass] = useState("General Admission");
  const [ticketQuantity, setTicketQuantity] = useState(0);
  const [ticketCost, setTicketCost] = useState(0.0);
  const [venueAddress1, setVenueAddress1] = useState("");
  const [venueAddress2, setVenueAddress2] = useState("");
  const [venueCity, setVenueCity] = useState("");
  const [venueCountry, setVenueCountry] = useState("");
  const utcStartDate = startDate
    ? startDate.toISOString().split(".")[0] + "Z"
    : null;
  const utcEndDate = endDate ? endDate.toISOString().split(".")[0] + "Z" : null;
  const [error, setError] = useState(null);

  const venueDetails = {
    venue_name: venueName,
    venue_address1: venueAddress1,
    venue_address2: venueAddress2,
    venue_city: venueCity,
    venue_country: venueCountry,
  };

  const ticketClassDetails = {
    "ticket_class.name": ticketClass,
    "ticket_class.quantity_total": setTicketQuantity,
    "ticket_class.cost": ticketCost,
  };
  useEffect(() => {
    fetchAllCategories()
      .then((categories) => {
        setCategories(categories);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  // handle add event click
  const handleCreateEvent = async (e) => {
    e.preventDefault();

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

    postAnEvent(eventDetails)
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((err) => {
        console.log(err, "<<<<<<<<err");
        setError(err.message);
      });
  };

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div id="add-event-page">
      <p className="add-event-page-heading">
        <span className="wrapper">C</span>reate an event by filling the form
        below and clicking the
        <span className="create-event-text"> Create Event</span> button!
      </p>
      <form id="event-form" method="post" onSubmit={handleCreateEvent}>
        <h4 className="add-event-form-heading">
          Please enter the event details here.
        </h4>
        <label className="event-label-section">
          <span className="event-label">Give your Event a Name: </span>
          <input
            type="text"
            placeholder="Event name"
            name="event-name"
            autoComplete="on"
            className="add-event-form-input reduced-width"
            required
            onChange={(e) => setEventName(e.target.value)}
          />
        </label>
        <label className="event-label-section">
          <span className="event-label">Describe about your event:</span>
          <textarea
            type="text"
            placeholder="Event Description"
            name="event-description"
            autoComplete="on"
            className="add-event-form-input add-event-form-text-area"
            required
            onChange={(e) => setEventDescription(e.target.value)}
          />
        </label>

        <label className="event-label-section">
          <span className="event-label">Choose an appropriate Category:</span>
          <select
            className="add-event-form-input reduced-width"
            onChange={(e) => setAddEventCategoryId(e.target.value)}
          >
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
              dateFormat="yyyy/MM/dd  hh:mm:ss"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              timeInputLabel="Time:"
              isClearable
              placeholderText="I have been cleared!"
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
              dateFormat="YYYY/MM/dd  hh:mm:ss"
              isClearable
              placeholderText="I have been cleared!"
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
              className="add-event-form-input venue-input"
              required
              onChange={(e) => setVenueName(e.target.value)}
            />
          </label>
          <p className="venue-address-heading">Address</p>
          <div className="venue-address">
            <label className="event-label-section">
              <span className="event-label">Street Name</span>
              <input
                type="text"
                placeholder="street name"
                autoComplete="on"
                className="add-event-form-input venue-input"
                onChange={(e) => setVenueAddress1(e.target.value)}
              />
            </label>
            <label className="event-label-section">
              <span className="event-label">Location & Postcode</span>
              <input
                type="text"
                placeholder="county/postcode"
                autoComplete="on"
                className="add-event-form-input venue-input"
                onChange={(e) => setVenueAddress2(e.target.value)}
              />
            </label>
          </div>
          <label className="event-label-section">
            <span className="event-label">City</span>
            <input
              type="text"
              placeholder="city"
              autoComplete="on"
              className="add-event-form-input reduced-width"
              onChange={(e) => setVenueCity(e.target.value)}
            />
          </label>
          <label className="event-label-section">
            <span className="event-label">Country</span>
            <input
              type="text"
              placeholder="country"
              autoComplete="on"
              className="add-event-form-input reduced-width"
              onChange={(e) => setVenueCountry(e.target.value)}
            />
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
              onChange={(e) => setTicketClass(e.target.value)}
            >
              <option>General Admission</option>
              <option>Donation</option>
              <option>Free</option>
            </select>
          </label>
          {ticketClass === "General Admission" ? (
            <label className="event-label-section">
              <span className="event-label">
                How much would you like to charge?{" "}
              </span>
              <CurrencyInput
                className="add-event-form-input reduced-width"
                id="input-example"
                name="price"
                placeholder="Please enter a number"
                prefix="£"
                required
                defaultValue={0.0}
                decimalsLimit={2}
                onValueChange={(value, name, values) => setTicketCost(value)}
              />
            </label>
          ) : null}

          <label className="event-label-section">
            <span className="event-label">
              What's the capacity for your event?
            </span>
            <input
              className="add-event-form-input reduced-width"
              type="number"
              defaultValue={0}
              min={0}
              required
              onChange={(e) => setTicketQuantity(e.target.value)}
            />
          </label>
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
