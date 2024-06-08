import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
//import selectedTree from '../../redux/reducers/selectedTree.reducer';

function EditTree() {
  const tree = useSelector((store) => store.selectedTree);
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
  }, [dispatch, id]);

  useEffect(() => {
    // Set the initial state of the input fields when tree details are loaded
    if (tree && tree.id === Number(id)) {
      console.log('Setting initial state:', tree);
      setName(tree.name || '');
      setDob(tree.dob || '');
      setImages(tree.images || '');
      setNotes(tree.notes || '');
    }
  }, [tree, id]);

  const submitForm = (event) => {
    event.preventDefault();
    const payload = { name, dob, images, notes, id };
    dispatch({
      type: 'EDIT_TREE',
      payload: { name, dob, images, notes, id },
      history,
    });
    console.log(payload, 'submitForm payload');
  };

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
          Image:{' '}
          <input
            value={images}
            onChange={(event) => setImages(event.target.value)}
          />
        </p>

        <p>
          Notes:{' '}
          <input
            value={notes}
            placeholder={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        </p>
        <input type="submit" />
      </form>
    </div>
  );
}

export default EditTree;
