import React from 'react';

const RepotForm = ({ datesToDisplay, repotDate, setRepotDate, submitForm }) => (
  <form onSubmit={(event) => submitForm(event, 4, repotDate)}>
    <h1>Care Action Taken</h1>
    <h2>--Repot--</h2>
    {datesToDisplay.map((dateToDisplay) => (
      <div key={dateToDisplay.id}>
        <h4>Next Best Date to Repot</h4>
        <h4>Last Date Repotted</h4>
        <h5>{dateToDisplay.date_text}</h5>
        <h4>Enter new date of Repotting</h4>
        <input
          type="date"
          value={repotDate}
          placeholder={repotDate}
          onChange={(event) => setRepotDate(event.target.value)}
        />
    <button>Submit</button>
      </div>
    ))}
  </form>
);

export default RepotForm;