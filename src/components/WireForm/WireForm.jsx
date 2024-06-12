import React from 'react';

const WireForm = ({
  datesToDisplay,
  wireDate,
  setWireDate,
  submitForm,
}) => (
  <form className="wireForm" onSubmit={(event) => submitForm(event, 1, wireDate)}>
    <h1>Care Action Taken</h1>
    <h2>--Wire--</h2>
    {datesToDisplay.length > 0 ? (
      datesToDisplay.map((dateToDisplay) => (
        <div key={dateToDisplay.id}>
          <h4>Next Best Date to Wire</h4>
          <h4>Last Date Wire Applied</h4>
          {/* {if (dateToDisplay.date_text > 07/01/2024) return (dateToDisplay.date_text +14)} */}
          <h5>{dateToDisplay.date_text}</h5>
          <h4>Enter new date of Wiring</h4>
          <input
            type="date"
            value={wireDate}
            onChange={(event) => setWireDate(event.target.value)}
          />
          <button type="submit">Submit</button>
        </div>
      ))
    ) : (
      <div>
        <h4>No previous wiring dates available.</h4>
        <h4>Enter new date of Wiring</h4>
        <input
          type="date"
          value={wireDate}
          onChange={(event) => setWireDate(event.target.value)}
        />
        <button type="submit">Submit</button>
      </div>
    )}
  </form>
);

export default WireForm;
