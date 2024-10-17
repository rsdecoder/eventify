import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";

const TicketForm = ({ ticketClass }) => {
    const [ticketCost, setTicketCost] = useState(0.00)
  return (
    <div className="ticketForm">
      {ticketClass === "General Admission" ? (
        <label className="ticketform-label">
          <span>Enter Price per ticket:</span>
          <CurrencyInput
            className=" ticketform-input"
            id="input-example"
            name="input-name"
            placeholder="Please enter a number"
            prefix="£"
            defaultValue={0.0}
            decimalsLimit={2}
            onValueChange={(value, name, values) => setTicketCost(value)}
          />
        </label>
      ) : null}

      <label>
        <span></span>
        <input
          type="number"
          className=" ticketform-input"
          min={0}
          defaultValue={0}
        />
      </label>
    </div>
  );
};

export default TicketForm;
