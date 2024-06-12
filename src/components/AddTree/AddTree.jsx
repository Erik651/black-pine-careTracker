
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function AddTree() {

  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [image, setImage] = useState('');

  const submitForm = (event) => {
    event.preventDefault();
    const payload = { name, dob, image };

    dispatch({ type: 'ADD_TREE', payload: { name, dob, image}, history});

    history.push('/myTrees');
  };

  
  return (
    <div>
      <h1>Add Tree</h1>
      <form onSubmit={submitForm}>
        <p>Name: <input value={name} onChange={(event) => setName(event.target.value)}/></p>
        <p>D.O.B <input value={dob} onChange={(event) => setDob(event.target.value)}/></p>
        <p>Image <input value={image} onChange={(event) => setImage(event.target.value)}/></p>
        <p>Add input dates of fertilize, prune, wire, repot, decandle</p>
        <input type="submit" />
      </form>
    </div>
  )
}

export default AddTree;