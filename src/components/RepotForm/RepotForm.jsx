import React from 'react';

const RepotForm = ({
  datesToDisplay,
  repotDate,
  setRepotDate,
  submitForm,
}) => (
  <form className="repotForm" onSubmit={(event) => submitForm(event, 1, repotDate)}>
    <h1>Care Action Taken</h1>
    <h2>--Repot--</h2>
    {datesToDisplay.length > 0 ? (
      datesToDisplay.map((dateToDisplay) => (
        <div key={dateToDisplay.id}>
          <h4>Next Best Date to Repot</h4>
          <h4>Last Date of Repotting </h4>
          {/* {if (dateToDisplay.date_text > 07/01/2024) return (dateToDisplay.date_text +14)} */}
          <h5>{dateToDisplay.date_text}</h5>
          <h4>Enter new date of Repotting</h4>
          <input
            type="date"
            value={repotDate}
            onChange={(event) => setRepotDate(event.target.value)}
          />
          <button type="submit">Submit</button>
        </div>
      ))
    ) : (
      <div>
        <h4>No previous repotting dates available.</h4>
        <h4>Enter new date of Repotting</h4>
        <input
          type="date"
          value={repotDate}
          onChange={(event) => setRepotDate(event.target.value)}
        />
        <button type="submit">Submit</button>
      </div>
    )}
  </form>
);

export default RepotForm;
