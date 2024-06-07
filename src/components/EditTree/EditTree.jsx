import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

function EditTree() {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [image, setImage] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    // Fetch the tree details to pre-fill the form if needed
    dispatch({ type: 'FETCH_TREE_DETAILS', payload: id });
  }, [dispatch, id]);

  const submitForm = (event) => {
    event.preventDefault();
    dispatch({ type: 'EDIT_TREE', payload: { name, dob, image, id}, history})
  }

  return (
    <div>
      <h1>Edit Tree</h1>
      <h3>{id}</h3>
      <form onSubmit={submitForm}>
        <p>Name: <input value={name} onChange={(event) => setName(event.target.value)}/></p>
        <p>DOB: <input value={dob} onChange={(event) => setDob(event.target.value)}/></p>
        <p>Image: <input value={image} onChange={(event) => setImage(event.target.value)}/></p>
        <input type="submit" />
      </form>
    </div>
  )

}

export default EditTree;