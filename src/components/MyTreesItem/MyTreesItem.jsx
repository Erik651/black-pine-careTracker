import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';

function MyTreesItem() {
  const dispatch = useDispatch();
  const tree = useSelector((store) => store.selectedTree);
  const datesToDisplay = useSelector((store) => store.tree_activity);
  const [fertilizeDate, setFertilizeDate] = useState('');
  const [pruneDate, setPruneDate] = useState('');
  const [decandleDate, setDecandleDate] = useState('');
  const [repotDate, setRepotDate] = useState('');
  const [wireDate, setWireDate] = useState('');
  const history = useHistory();
  const { id: treeId } = useParams();

  useEffect(() => {
    console.log('in MyTreesItem useEffect');
    dispatch({ type: 'FETCH_SELECTED_TREE', payload: treeId });
    dispatch({ type: 'FETCH_TREE_ACTIVITY_DATES', payload: treeId });
  }, [treeId]);

  const submitForm = (event) => {
    event.preventDefault();
    const payload = { tree_id, date_text, activity_id, id };
    dispatch({
      type: 'UPDATE_ACTIVITY_DATE',
      payload: { tree_id, date_text, activity_id, id },
      history,
    });
    console.log(payload, 'submitForm UPDATE_ACTIVITY_DATE payload');
  };

  console.log('datesToDisplay', datesToDisplay);

  return (
    <div>
      <h1>{treeId}</h1>

      {/* <h3>{tree.name}</h3> */}
      <section className="myTreesItem">
        {datesToDisplay
          .filter((dateToDisplay) => dateToDisplay.tree_id === tree.id)
          .map((dateToDisplay) => (
            <>
              <div id={tree.id} key={tree.id}>
                <h3>{tree.name}</h3>
                <h3>{tree.dob}</h3>
                <img src={`/${tree.images}`} />
                <h5>{tree.notes}</h5>
                <Link to={`/editTree/${tree.id}`}>Edit</Link>
              </div>
              <div>
             
               <> <form onSubmit={submitForm}>
                  <h1>Care Action Taken</h1>
                  <h2>--Fertilize--</h2>
                  <h4>Next Best Date to Fertilize</h4>
                  <h5>display date</h5>
                  <h4>Last Date Fertilize Applied</h4>
                  <h5>display date</h5>
                  <h5>{dateToDisplay.date_text}</h5>
                  <h4>Enter new date of Fertilizing </h4>
                  <input
                    type="date"
                    value={fertilizeDate}
                    placeholder={fertilizeDate}
                    onChange={(event) => setFertilizeDate(event.target.value)}
                  />

                  <button>Submit</button>
                </form></>
              

                <h2>--Prune--</h2>
                <h4>Next Best Date to Prune</h4>
                <h5>{dateToDisplay.date}</h5>
                <h4>Last Date of Pruning</h4>
                <h5>display date</h5>
                <h4>Enter new date of Pruning</h4>
                <input
                  type="date"
                  value={pruneDate}
                  placeholder={pruneDate}
                  onChange={(event) => setPruneDate(event.target.value)}
                />
                <button>Submit</button>
                <br />
                <h2>--Decandle--</h2>
                <h4>Next Best Date to Decandle</h4>
                <h5>display date</h5>
                <h4>Last Date of Decandleing</h4>
                <h5>display date</h5>
                <h4>Enter new date of decandeling</h4>
                <input
                  type="date"
                  value={decandleDate}
                  placeholder={decandleDate}
                  onChange={(event) => setDecandleDate(event.target.value)}
                />
                <button>Submit</button>
                <br />
                <h2>--Repot--</h2>
                <h4>Next Best Date to Repot</h4>
                <h5>display date</h5>
                <h4>Last Date of Repotting</h4>
                <h5>display date</h5>
                <h4>Enter new date of repotting</h4>
                <input
                  type="date"
                  value={repotDate}
                  placeholder={repotDate}
                  onChange={(event) => setRepotDate(event.target.value)}
                />
                <button>Submit</button>
                <br />
                <h2>--Wire--</h2>
                <h4>Next Best Date to Wire</h4>
                <h5>display date</h5>
                <h4>Last Date of Wiring</h4>
                <h5>display date</h5>
                <h4>Enter New Date of Wiring</h4>
                <input
                  type="date"
                  value={wireDate}
                  placeholder={wireDate}
                  onChange={(event) => setWireDate(event.target.value)}
                />
                <button>Submit</button>
                <h4>!!! Alert !!!!</h4>
                <h5>Alert if X is less then amount of time has passed </h5>
                <h5>display how many days have passed</h5>
                <h4>!!! Remove Wire !!!</h4>
              </div>
            </>
          ))}
      </section>
    </div>
  );
}

export default MyTreesItem;
