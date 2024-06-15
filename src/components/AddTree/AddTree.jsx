
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import FertilizeForm from '../FertilizeForm/FertilizeForm';
// import PruneForm from '../PruneForm/PruneForm';
// import DecandleForm from '../DecandleForm/DecandleForm';
// import WireForm from '../WireForm/WireForm';
// import RepotForm from '../RepotForm/RepotForm';

function AddTree() {
  const statuses = useSelector((store) => store.statuses);
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [image, setImage] = useState('');
  const [fertilizeDate, setFertilizeDate] = useState('');
  const [pruneDate, setPruneDate] = useState('');
  const [decandleDate, setDecandleDate] = useState('');
  const [repotDate, setRepotDate] = useState('');
  const [wireDate, setWireDate] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    // Fetch the tree details to pre-fill the form if needed
    // dispatch({ type: 'FETCH_TREE_DETAILS', payload: id });
    dispatch({ type: 'FETCH_ALL_STATUSES' });
  }, [dispatch]);

  const submitForm = (event) => {
    event.preventDefault();
    const payload = { name, dob, image };

    dispatch({ type: 'ADD_TREE', payload: { name, dob, image}, history});
    dispatch({
      type: 'UPDATE_ACTIVITY_DATE',
      payload,
      // history,
    });

    history.push('/myTrees');
  };

  
  return (
    <div>
      <h1>Add Tree</h1>
      <form onSubmit={submitForm}>
        <p>Name: <input value={name} onChange={(event) => setName(event.target.value)}/></p>
        <p>D.O.B <input value={dob} onChange={(event) => setDob(event.target.value)}/></p>
        <p>Image <input value={image} onChange={(event) => setImage(event.target.value)}/></p>
        <div>
        <h4>No previous fertilize dates available.</h4>
        <h4>Enter new date of Fertilizing</h4>
        <input
          type="date"
          value={fertilizeDate}
          onChange={(event) => setFertilizeDate(event.target.value)}
        />
        {/* <button type="submit">Submit</button> */}
      </div>
      <select
          value={selectedStatus}
          onChange={(event) => setSelectedStatus(event.target.value)}
          >
          <option value="" disabled>
            Change Status
          </option>
          {statuses.map((status) => (
            <option key={status.id} value={status.id}>
              {status.status_name}
            </option>
          ))}
        </select>
          
          <br />

        
        <p>Add input dates of fertilize, prune, wire, repot, decandle</p>
        <input type="submit" />
      </form>
    </div>
  )
}

export default AddTree;