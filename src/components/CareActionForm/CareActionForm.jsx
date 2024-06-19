// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useParams, useHistory } from 'react-router-dom';
// import FertilizeForm from '../FertilizeForm/FertilizeForm';
// import PruneForm from '../PruneForm/PruneForm';
// import DecandleForm from '../DecandleForm/DecandleForm';
// import WireForm from '../WireForm/WireForm';
// import RepotForm from '../RepotForm/RepotForm';

// function CareActionForm() {
//   const dispatch = useDispatch();
//   const treeToDisplay = useSelector((store) => store.selectedTree);
//   const datesToDisplay = useSelector((store) => store.tree_activity);
//   const [fertilizeDate, setFertilizeDate] = useState('');
//   const [pruneDate, setPruneDate] = useState('');
//   const [decandleDate, setDecandleDate] = useState('');
//   const [repotDate, setRepotDate] = useState('');
//   const [wireDate, setWireDate] = useState('');

//   const history = useHistory();

//   const { id: treeId } = useParams();

//   useEffect(() => {
//     dispatch({ type: 'FETCH_SELECTED_TREE', payload: treeId });
//     dispatch({ type: 'FETCH_TREE_ACTIVITY_DATES', payload: treeId });
//   }, [dispatch, treeId]);

//   const submitForm = (event, activityId, date) => {
//     event.preventDefault();
//     const payload = { date_text: date, treeId, activity_id: activityId };
//     const initialDates = [
//       { activity_id: 1, date_text: fertilizeDate },
//       { activity_id: 2, date_text: pruneDate },
//       { activity_id: 3, date_text: decandleDate },
//       { activity_id: 4, date_text: repotDate },
//       { activity_id: 5, date_text: wireDate },
//     ].filter((activity) => activity.date_text);

//     if (initialDates.date_text = '') {
//       const initialPayload = { treeId, initialDates };
//       dispatch({ type: 'ADD_INITIAL_TREE_ACTIVITY', payload: initialPayload });
//     } else {
//       dispatch({
//         type: 'UPDATE_ACTIVITY_DATE',
//         payload,
//         history,
//       });
//     }

//   };

//   // const handleInitialDatesSubmit = () => {
//   //   const initialDates = [
//   //     { activity_id: 1, date_text: fertilizeDate },
//   //     { activity_id: 2, date_text: pruneDate },
//   //     { activity_id: 3, date_text: decandleDate },
//   //     { activity_id: 4, date_text: repotDate },
//   //     { activity_id: 5, date_text: wireDate },
//   //   ].filter(activity => activity.date_text); // Filter out empty dates

//   //   if (initialDates.length > 0) {
//   //     const payload = { treeId, initialDates };
//   //     dispatch({ type: 'ADD_INITIAL_TREE_ACTIVITY', payload });
//   //   }
//   // };

//   if (!treeToDisplay) {
//     return <div>Loading...</div>;
//   }

//   const normalizedTreeId = parseInt(treeId, 10);
//   const filteredDates = datesToDisplay.filter(
//     (date) => date.tree_id === normalizedTreeId
//   );

//   const goBack = () => {
//     history.goBack();
//   };
//   return (
//     <div>
//       <h1>{treeToDisplay.name}</h1>
//       <button onClick={goBack}>Back</button>
//       <div>
//         <section className="myTreesItem">
//           {treeToDisplay.status_id === 1 && (
//             <>
//               <FertilizeForm
//                 datesToDisplay={filteredDates.filter(
//                   (date) => date.activity_id === 1
//                 )}
//                 fertilizeDate={fertilizeDate}
//                 setFertilizeDate={setFertilizeDate}
//                 submitForm={submitForm}
//               />
//               <PruneForm
//                 datesToDisplay={filteredDates.filter(
//                   (date) => date.activity_id === 2
//                 )}
//                 pruneDate={pruneDate}
//                 setPruneDate={setPruneDate}
//                 submitForm={submitForm}
//               />
//               <DecandleForm
//                 datesToDisplay={filteredDates.filter(
//                   (date) => date.activity_id === 3
//                 )}
//                 decandleDate={decandleDate}
//                 setDecandleDate={setDecandleDate}
//                 submitForm={submitForm}
//               />
//               <WireForm
//                 datesToDisplay={filteredDates.filter(
//                   (date) => date.activity_id === 5
//                 )}
//                 wireDate={wireDate}
//                 setWireDate={setWireDate}
//                 submitForm={submitForm}
//               />
//               <RepotForm
//                 datesToDisplay={filteredDates.filter(
//                   (date) => date.activity_id === 4
//                 )}
//                 repotDate={repotDate}
//                 setRepotDate={setRepotDate}
//                 submitForm={submitForm}
//               />
//               {/* <button onClick={handleInitialDatesSubmit}>Save Initial Dates</button> */}
//             </>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// }

// export default CareActionForm;

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

function CareActionForm() {
  const dispatch = useDispatch();
  const treeToDisplay = useSelector((store) => store.selectedTree);
  const datesToDisplay = useSelector((store) => store.tree_activity);
  const [fertilizeDate, setFertilizeDate] = useState('');
  const [pruneDate, setPruneDate] = useState('');
  const [decandleDate, setDecandleDate] = useState('');
  const [repotDate, setRepotDate] = useState('');
  const [wireDate, setWireDate] = useState('');
  const history = useHistory();
  const { id: treeId } = useParams();

  useEffect(() => {
    dispatch({ type: 'FETCH_SELECTED_TREE', payload: treeId });
    dispatch({ type: 'FETCH_TREE_ACTIVITY_DATES', payload: treeId });
  }, [treeId]);

  const submitForm = (event, activityId, date) => {
    console.log('event', event, 'activityId', activityId, 'date', date);
    event.preventDefault();
    const payload = { date_text: date, treeId, activity_id: activityId };
    console.log('payload', payload);
    // Check if the activity already has a date in the filteredDates
    const existingActivity = datesToDisplay.find(
      (date) => date.tree_id === treeId && date.activity_id === activityId
    );

    if (existingActivity) {
      dispatch({
        type: 'UPDATE_ACTIVITY_DATE',
        payload,
        history,
      });
    } else {
      dispatch({
        type: 'ADD_INITIAL_TREE_ACTIVITY',
        payload,
        history,
      });
    }
  };

  if (!treeToDisplay) {
    return <div>Loading...</div>;
  }

  const normalizedTreeId = parseInt(treeId, 10);
  const filteredDates = datesToDisplay.filter(
    (date) => date.tree_id === normalizedTreeId
  );

  const goBack = () => {
    history.goBack();
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return isNaN(date.getTime())
      ? 'Invalid Date'
      : date.toISOString().split('T')[0];
  };

  const renderForm = (label, activityId, value, setValue, dates) => (
    // console.log(setValue, 'setValue')
    <div key={activityId}>
      <h3>Care Action Taken --{label}--</h3>
      <h4>
        Last Date {label} Applied:{' '}
        {dates.length > 0
          ? formatDate(dates[dates.length - 1].date_text)
          : 'N/A'}
      </h4>
      <input
        type="date"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="mm/dd/yyyy"
      />
      <button onClick={(e) => submitForm(e, activityId, value)}>Submit</button>
    </div>
  );
  // console.log(renderForm, 'renderForm')
  return (
    <div>
      <h1>{treeToDisplay.name}</h1>
      <button onClick={goBack}>Back</button>
      <div>
        <section className="myTreesItem">
          {treeToDisplay.status_id === 1 && (
            <>
              {renderForm(
                'Fertilize',
                1,
                fertilizeDate,
                setFertilizeDate,
                filteredDates.filter((date) => date.activity_id === 1)
              )}
              {renderForm(
                'Prune',
                2,
                pruneDate,
                setPruneDate,
                filteredDates.filter((date) => date.activity_id === 2)
              )}
              {renderForm(
                'Decandle',
                3,
                decandleDate,
                setDecandleDate,
                filteredDates.filter((date) => date.activity_id === 3)
              )}
              {renderForm(
                'Wire',
                5,
                wireDate,
                setWireDate,
                filteredDates.filter((date) => date.activity_id === 5)
              )}
              {renderForm(
                'Repot',
                4,
                repotDate,
                setRepotDate,
                filteredDates.filter((date) => date.activity_id === 4)
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default CareActionForm;
