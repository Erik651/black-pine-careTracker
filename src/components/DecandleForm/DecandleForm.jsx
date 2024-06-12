import React from 'react';

const DecandleForm = ({ datesToDisplay, decandleDate, setDecandleDate, submitForm }) => (
  <form onSubmit={(event) => submitForm(event, 3, decandleDate)}>
    <h1>Care Action Taken</h1>
    <h2>--Decandle--</h2>
    {datesToDisplay.map((dateToDisplay) => (
      <div key={dateToDisplay.id}>
        <h4>Next Best Date to Decandle</h4>
        <h4>Last Date Decandled</h4>
        <h5>{dateToDisplay.date_text}</h5>
        <h4>Enter new date of Decandle</h4>
        <input
          type="date"
          value={decandleDate}
          placeholder={decandleDate}
          onChange={(event) => setDecandleDate(event.target.value)}
        />
    <button>Submit</button>
      </div>
    ))}
  </form>
);

export default DecandleForm;