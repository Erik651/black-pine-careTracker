import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import FertilizeForm from '../FertilizeForm/FertilizeForm';
import PruneForm from '../PruneForm/PruneForm';
import DecandleForm from '../DecandleForm/DecandleForm';
import WireForm from '../WireForm/WireForm';
import RepotForm from '../RepotForm/RepotForm';

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
  }, [dispatch, treeId]);

  const submitForm = (event, activityId, date) => {
    event.preventDefault();
    const payload = { date_text: date, treeId, activity_id: activityId };
    const initialDates = [
      { activity_id: 1, date_text: fertilizeDate },
      { activity_id: 2, date_text: pruneDate },
      { activity_id: 3, date_text: decandleDate },
      { activity_id: 4, date_text: repotDate },
      { activity_id: 5, date_text: wireDate },
    ].filter(activity => activity.date_text);

    if (initialDates.length > 0) {
      const initialPayload = { treeId, initialDates };
      dispatch({ type: 'ADD_INITIAL_TREE_ACTIVITY', payload: initialPayload });
    } else {
      dispatch({
        type: 'UPDATE_ACTIVITY_DATE',
        payload,
        history,
      });
    }
  };

  // const handleInitialDatesSubmit = () => {
  //   const initialDates = [
  //     { activity_id: 1, date_text: fertilizeDate },
  //     { activity_id: 2, date_text: pruneDate },
  //     { activity_id: 3, date_text: decandleDate },
  //     { activity_id: 4, date_text: repotDate },
  //     { activity_id: 5, date_text: wireDate },
  //   ].filter(activity => activity.date_text); // Filter out empty dates

  //   if (initialDates.length > 0) {
  //     const payload = { treeId, initialDates };
  //     dispatch({ type: 'ADD_INITIAL_TREE_ACTIVITY', payload });
  //   }
  // };

  if (!treeToDisplay) {
    return <div>Loading...</div>;
  }

  const normalizedTreeId = parseInt(treeId, 10);
  const filteredDates = datesToDisplay.filter((date) => date.tree_id === normalizedTreeId);


  const goBack = () => {
    history.goBack();
  };
  return (
    <div>
      <h1>{treeToDisplay.name}</h1>
      <button onClick={goBack}>Back</button>
      <div>
        <section className="myTreesItem">
          {treeToDisplay.status_id === 1 && (
            <>
              <FertilizeForm
                datesToDisplay={filteredDates.filter((date) => date.activity_id === 1)}
                fertilizeDate={fertilizeDate}
                setFertilizeDate={setFertilizeDate}
                submitForm={submitForm}
              />
              <PruneForm
                datesToDisplay={filteredDates.filter((date) => date.activity_id === 2)}
                pruneDate={pruneDate}
                setPruneDate={setPruneDate}
                submitForm={submitForm}
              />
              <DecandleForm
                datesToDisplay={filteredDates.filter((date) => date.activity_id === 3)}
                decandleDate={decandleDate}
                setDecandleDate={setDecandleDate}
                submitForm={submitForm}
              />
              <WireForm
                datesToDisplay={filteredDates.filter((date) => date.activity_id === 5)}
                wireDate={wireDate}
                setWireDate={setWireDate}
                submitForm={submitForm}
              />
              <RepotForm
                datesToDisplay={filteredDates.filter((date) => date.activity_id === 4)}
                repotDate={repotDate}
                setRepotDate={setRepotDate}
                submitForm={submitForm}
                
              />
              {/* <button onClick={handleInitialDatesSubmit}>Save Initial Dates</button> */}
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default CareActionForm;
