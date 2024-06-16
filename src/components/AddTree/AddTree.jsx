
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import FertilizeForm from '../FertilizeForm/FertilizeForm';
// import PruneForm from '../PruneForm/PruneForm';
// import DecandleForm from '../DecandleForm/DecandleForm';
// import WireForm from '../WireForm/WireForm';
// import RepotForm from '../RepotForm/RepotForm';

function AddTree() {
  const user = useSelector((store) => store.user)
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
  // const { id } = useParams();

  useEffect(() => {
    // Fetch the tree details to pre-fill the form if needed
    // dispatch({ type: 'FETCH_TREE_DETAILS', payload: id });
    dispatch({ type: 'FETCH_ALL_STATUSES' });
    // dispatch({ type: 'SET_USER', payload: user_id})
  }, [dispatch]);

  const handleFileUpload = async (treeId) => {
    const formData = new FormData();
    if (image) {
      formData.append('images', image);
      formData.append('tree_id', treeId); // Append tree_id to the form data

      try {
        const uploadResponse = await fetch('/api/upload/multiple', {
          method: 'POST',
          body: formData,
        });
        const uploadData = await uploadResponse.text();
        console.log("Image upload response:", uploadData);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const updateActivityDates = (treeId) => {
    const activities = [
      { activity_id: 1, date: fertilizeDate },
      { activity_id: 2, date: pruneDate },
      { activity_id: 3, date: decandleDate },
      { activity_id: 4, date: repotDate },
      { activity_id: 5, date: wireDate },
    ];

    activities.forEach((activity) => {
      if (activity.date) {
        dispatch({
          type: 'UPDATE_ACTIVITY_DATE',
          payload: {
            date_text: activity.date,
            treeId,
            activity_id: activity.activity_id,
          },
        });
      }
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const payload = {
      name,
      dob,
      notes,
      status_id: selectedStatus,
      user_id: user.id, // Include only user ID in the payload
    };

    try {
      const response = await fetch('/api/trees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to create new tree');
      }

      const newTree = await response.json();
      const treeId = newTree.id;

      await handleFileUpload(treeId);

      dispatch({ type: 'ADD_TREE', payload: { ...payload, id: treeId }, history });
      updateActivityDates(treeId);
      history.push('/myTrees');
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };



  
  return (
    <div>
      <h1>Add Tree</h1>
      <form onSubmit={submitForm}>
        <p>Name: <input value={name} onChange={(event) => setName(event.target.value)} /></p>
        <p>D.O.B <input value={dob} onChange={(event) => setDob(event.target.value)} /></p>
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
        <div>
          {/* <h4>No previous fertilize dates available.</h4> */}
          <h4>Enter last date of Fertilizing</h4>
          <input
            type="date"
            value={fertilizeDate}
            onChange={(event) => setFertilizeDate(event.target.value)}
          />
          <h4>Enter last date of Pruning</h4>
          <input
            type="date"
            value={pruneDate}
            onChange={(event) => setPruneDate(event.target.value)}
          />
          <h4>Enter last date of Wiring</h4>
          <input
            type="date"
            value={wireDate}
            onChange={(event) => setWireDate(event.target.value)}
          />
          <h4>Enter last date of Repot</h4>
          <input
            type="date"
            value={repotDate}
            onChange={(event) => setRepotDate(event.target.value)}
          />
          <h4>Enter last date of Decandling</h4>
          <input
            type="date"
            value={decandleDate}
            onChange={(event) => setDecandleDate(event.target.value)}
          />
        </div>
        <p>Notes: <textarea value={notes} onChange={(event) => setNotes(event.target.value)} /></p>
        <p>Image:</p>
        <input type="file" name="images" multiple onChange={(event) => setImage(event.target.files[0])} />
        <input type="submit" value="Save" />
      </form>
    </div>
  );
}

export default AddTree;