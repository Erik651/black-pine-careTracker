import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
//import selectedTree from '../../redux/reducers/selectedTree.reducer';

function EditTree() {
  const tree = useSelector((store) => store.selectedTree);
  const statuses = useSelector((store) => store.statuses);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [images, setImages] = useState('');
  const [notes, setNotes] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  //console.log(tree, "tree data")

  useEffect(() => {
    // Fetch the tree details to pre-fill the form if needed
    dispatch({ type: 'FETCH_TREE_DETAILS', payload: id });
    dispatch({ type: 'FETCH_ALL_STATUSES' });
  }, [dispatch, id]);

  useEffect(() => {
    // Set the initial state of the input fields when tree details are loaded
    if (tree && tree.id === Number(id)) {
      console.log('Setting initial state:', tree);
      setName(tree.name || '');
      setDob(tree.dob || '');
      setImages(tree.images || '');
      setNotes(tree.notes || '');
      setSelectedStatus(tree.status_id || '');
    }
  }, [tree, id]);

  const submitForm = (event) => {
    event.preventDefault();
    const payload = { name, dob, images, notes, status_id: selectedStatus, id };
    dispatch({
      type: 'EDIT_TREE',
      payload: { name, dob, images, notes, status_id: selectedStatus, id },
      history,
    });
    console.log(payload, 'submitForm payload');
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', event.target.image.files[0]);

    try {
      const response = await fetch('/api/upload/single', {
        method: 'POST',
        body: formData,
      });
      const data = await response.text();
      alert("successful image upload")
      console.log(data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  if (!statuses || !tree || tree.id !== Number(id)) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>Edit Tree</h1>
      <h3>{id}</h3>
      <form onSubmit={submitForm}>
        <p>
          Name:
          <input
            value={name}
            placeholder={name}
            onChange={(event) => setName(event.target.value)}
          />
        </p>
        <p>
          DOB:{' '}
          <input value={dob} onChange={(event) => setDob(event.target.value)} />
        </p>

        <p>
          Notes:{' '}
          <input
            value={notes}
            placeholder={notes}
            onChange={(event) => setNotes(event.target.value)}
            />
        </p>
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

        <input type="submit" value="Save" />
      </form>
          <p>
            Image:{' '}
          </p>
          <form onSubmit={handleFileUpload} encType="multipart/form-data">
            <input type="file" name="image" />
            <button type="submit">Submit</button>
          </form>
    </div>
  );
}

export default EditTree;
