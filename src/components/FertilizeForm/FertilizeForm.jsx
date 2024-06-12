import React from 'react';

const FertilizeForm = ({
  datesToDisplay,
  fertilizeDate,
  setFertilizeDate,
  submitForm,
}) => (
  <form onSubmit={(event) => submitForm(event, 1, fertilizeDate)}>
    <h1>Care Action Taken</h1>
    <h2>--Fertilize--</h2>
    {datesToDisplay.length > 0 ? (
      datesToDisplay.map((dateToDisplay) => (
        <div key={dateToDisplay.id}>
          <h4>Next Best Date to Fertilize</h4>
          <h4>Last Date Fertilize Applied</h4>
          <h5>{dateToDisplay.date_text}</h5>
          <h4>Enter new date of Fertilizing</h4>
          <input
            type="date"
            value={fertilizeDate}
            onChange={(event) => setFertilizeDate(event.target.value)}
          />
          <button type="submit">Submit</button>
        </div>
      ))
    ) : (
      <div>
        <h4>No previous fertilize dates available.</h4>
        <h4>Enter new date of Fertilizing</h4>
        <input
          type="date"
          value={fertilizeDate}
          onChange={(event) => setFertilizeDate(event.target.value)}
        />
        <button type="submit">Submit</button>
      </div>
    )}
  </form>
);

export default FertilizeForm;
