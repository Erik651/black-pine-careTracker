import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function ImageUpload() {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();

  const tree = useSelector((store) => store.selectedTree);
  const statuses = useSelector((store) => store.statuses);

  useEffect(() => {
    dispatch({ type: 'FETCH_SELECTED_TREE', payload: id });
    dispatch({ type: 'FETCH_ALL_STATUSES' });
  }, [dispatch, id]);

  const handleFileUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const files = event.target.images.files;
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }
    formData.append('tree_id', id);

    try {
      const response = await fetch('/api/upload/multiple', {
        method: 'POST',
        body: formData,
      });
      const data = await response.text();
      alert("Successful image upload");
      console.log(data);
      history.push(`/myTreesItem/${id}`);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const goBack = () => {
    history.goBack();
  };

  if (!statuses || !tree || tree.id !== Number(id)) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Upload Images for {tree.name}</h1>
      <button onClick={goBack}>Back</button>
      <form onSubmit={handleFileUpload} encType="multipart/form-data">
        <p>
          Image:{' '}
          <input type="file" name="images" multiple />
        </p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ImageUpload;