import React from 'react';

const WireForm = ({ datesToDisplay, pruneDate, setPruneDate, submitForm }) => (
  <form onSubmit={(event) => submitForm(event, 5, WireDate)}>
    <h1>Care Action Taken</h1>
    <h2>--Wire--</h2>
    {datesToDisplay.map((dateToDisplay) => (
      <div key={dateToDisplay.id}>
        <h4>Next Best Date to Wire</h4>
        <h4>Last Date Wired</h4>
        <h5>{dateToDisplay.date_text}</h5>
        <h4>Enter new date of Wiring</h4>
        <input
          type="date"
          value={pruneDate}
          placeholder={pruneDate}
          onChange={(event) => setPruneDate(event.target.value)}
        />
    <button>Submit</button>
      </div>
    ))}
  </form>
);

export default WireForm;