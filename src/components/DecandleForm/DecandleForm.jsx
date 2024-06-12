import React from 'react';

const DecandleForm = ({
  datesToDisplay,
  decandleDate,
  setDecandleDate,
  submitForm,
}) => (
  <form className="decandleForm" onSubmit={(event) => submitForm(event, 3, decandleDate)}>
    <h1>Care Action Taken</h1>
    <h2>--Decandle--</h2>
    {datesToDisplay.length > 0 ? (
      datesToDisplay.map((dateToDisplay) => (
        <div key={dateToDisplay.id}>
          <h4>Next Best Date to Decandle</h4>
          <h4>Last Date of Decandling</h4>
          {/* {if (dateToDisplay.date_text > 07/01/2024) return (dateToDisplay.date_text +14)} */}
          <h5>{dateToDisplay.date_text}</h5>
          <h4>Enter new date of Decandling</h4>
          <input
            type="date"
            value={decandleDate}
            onChange={(event) => setDecandleDate(event.target.value)}
          />
          <button type="submit">Submit</button>
        </div>
      ))
    ) : (
      <div>
        <h4>No previous Decandling dates available.</h4>
        <h4>Enter new date of Decandling</h4>
        <input
          type="date"
          value={decandleDate}
          onChange={(event) => setDecandleDate(event.target.value)}
        />
        <button type="submit">Submit</button>
      </div>
    )}
  </form>
);

export default DecandleForm;