import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import FertilizeForm from '../FertilizeForm/FertilizeForm';
import PruneForm from '../PruneForm/PruneForm';
import DecandleForm from '../DecandleForm/DecandleForm';
import WireForm from '../WireForm/WireForm';
import RepotForm from '../RepotForm/RepotForm';
import './MyTreesItem.css';

function MyTreesItem() {
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

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-CA'); // 'en-CA' for YYYY-MM-DD format
  };

  useEffect(() => {
    console.log('in MyTreesItem useEffect');
    dispatch({ type: 'FETCH_SELECTED_TREE', payload: treeId });
    dispatch({ type: 'FETCH_TREE_ACTIVITY_DATES', payload: treeId });
    console.log(treeId, 'treeId from dispatch')
  }, [treeId]);

  const submitForm = (event, activityId, date) => {
    event.preventDefault();
    const payload = { date_text: date, treeId, activity_id: activityId };
    dispatch({
      type: 'UPDATE_ACTIVITY_DATE',
      payload,
      history,
    });
    console.log(payload, 'submitForm UPDATE_ACTIVITY_DATE payload');
  };

  console.log('datesToDisplay', datesToDisplay);
  if (!treeToDisplay) {
    return <div>Loading...</div>;
  }

  const normalizedTreeId = parseInt(treeId, 10);
  
  // Log the treeId to ensure it's being correctly retrieved and its type
  console.log('treeId:', treeId, typeof treeId);
  console.log('normalizedTreeId:', normalizedTreeId, typeof normalizedTreeId);

  // Apply filter and log intermediate results
  const filteredDates = datesToDisplay.filter((date) => {
    const isMatch = date.tree_id === normalizedTreeId;
    console.log('date.tree_id:', date.tree_id, typeof date.tree_id, 'isMatch:', isMatch);
    return isMatch;
  });

  console.log(filteredDates, 'filtered Dates')

  

  const renderLastActionDates = () => {
    const activityTypes = {
      1: 'Fertilize',
      2: 'Prune',
      3: 'Decandle',
      4: 'Repot',
      5: 'Wire'
    };

    return filteredDates.map((date) => (
      <div key={date.activity_id}>
        Last {activityTypes[date.activity_id]} Date: {formatDate(date.date_text)}
      </div>
    ));
  };

  
  return (
    <div>
      <h1>{treeId}</h1>
      <div>
        {/* <h3>{tree.name}</h3> */}
        <section className="myTreesItem">
          <h1>Name: {treeToDisplay.name}</h1>
          <h3>Date of birth: {formatDate(treeToDisplay.dob)}</h3>
          <h3>{renderLastActionDates()}</h3>
          <img src={`/${treeToDisplay.images}`} />
          <h3>Notes: {treeToDisplay.notes}</h3>

          <Link to={`/editTree/${treeToDisplay.id}`}>Edit</Link>
          <br/>
          <br/>
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
            </>
          )}
          <br />

          {/* <h4>!!! Alert !!!!</h4>
          <h5>Alert if X is less then amount of time has passed </h5>
          <h5>display how many days have passed</h5>
          <h4>!!! Remove Wire !!!</h4> */}
        </section>
      </div>
    </div>
  );
}

export default MyTreesItem;
