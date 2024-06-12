import React from 'react';

const PruneForm = ({ datesToDisplay, pruneDate, setPruneDate, submitForm }) => (
  <form onSubmit={(event) => submitForm(event, 2, pruneDate)}>
    <h1>Care Action Taken</h1>
    <h2>--Prune--</h2>
    {datesToDisplay.map((dateToDisplay) => (
      <div key={dateToDisplay.id}>
        <h4>Next Best Date to Prune</h4>
        <h4>Last Date Pruned</h4>
        <h5>{dateToDisplay.date_text}</h5>
        <h4>Enter new date of Pruning</h4>
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

export default PruneForm;