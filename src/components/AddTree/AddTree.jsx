
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
          <h4>No previous fertilize dates available.</h4>
          <h4>Enter new date of Fertilizing</h4>
          <input
            type="date"
            value={fertilizeDate}
            onChange={(event) => setFertilizeDate(event.target.value)}
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