import React from 'react';

const PruneForm = ({
  datesToDisplay,
  pruneDate,
  setPruneDate,
  submitForm,
}) => (
  <form className="pruneForm" onSubmit={(event) => submitForm(event, 2, pruneDate)}>
    <h1>Care Action Taken</h1>
    <h2>--Prune--</h2>
    {datesToDisplay.length > 0 ? (
      datesToDisplay.map((dateToDisplay) => (
        <div key={dateToDisplay.id}>
          <h4>Next Best Date to Prune</h4>
          <h4>Last Date of Pruning</h4>
          {/* {if (dateToDisplay.date_text > 07/01/2024) return (dateToDisplay.date_text +14)} */}
          <h5>{dateToDisplay.date_text}</h5>
          <h4>Enter new date of Pruning</h4>
          <input
            type="date"
            value={pruneDate}
            onChange={(event) => setPruneDate(event.target.value)}
          />
          <button type="submit">Submit</button>
        </div>
      ))
    ) : (
      <div>
        <h4>No previous pruning dates available.</h4>
        <h4>Enter new date of Pruning</h4>
        <input
          type="date"
          value={pruneDate}
          onChange={(event) => setPruneDate(event.target.value)}
        />
        <button type="submit">Submit</button>
      </div>
    )}
  </form>
);

export default PruneForm;