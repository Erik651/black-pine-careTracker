import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import './MyTreesItem.css';

function MyTreesItem() {
  const dispatch = useDispatch();
  const treeToDisplay = useSelector((store) => store.selectedTree);
  const datesToDisplay = useSelector((store) => store.tree_activity);
  const imagesToDisplay = useSelector((store) => store.images) || [];

  const history = useHistory();
  const { id: treeId } = useParams();

  useEffect(() => {
    dispatch({ type: 'FETCH_SELECTED_TREE', payload: treeId });
    dispatch({ type: 'FETCH_TREE_ACTIVITY_DATES', payload: treeId });
    dispatch({ type: 'FETCH_IMAGES_BY_ID', payload: treeId });
  }, [dispatch, treeId]);

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this tree?'
    );
    if (confirmDelete) {
      dispatch({ type: 'DELETE_TREE', payload: treeId, history });
    }
  };

  if (!treeToDisplay) {
    return <div>Loading...</div>;
  }

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
      return 'n/a';
    }
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const normalizedTreeId = parseInt(treeId, 10);
  const filteredDates = datesToDisplay.filter(
    (date) => date.tree_id === normalizedTreeId
  );

  const renderLastActionDates = () => {
    const activityTypes = ['Fertilize', 'Prune', 'Decandle', 'Repot', 'Wire'];
    return activityTypes.map((activity, i) => (
      <div key={i}>
        <p>
          Last {activity} Date:{' '}
          {formatDate(
            filteredDates.findLast((date) => date.activity_id == i + 1)
              ?.date_text
          )}
        </p>
      </div>
    ));
    // return filteredDates.map((date) => (
    //   <div key={date.id}>
    //     <p>
    //       Last {activityTypes[date.activity_id]} Date:{' '}
    //       {formatDate(date.date_text)}
    //     </p>
    //   </div>
    // ));
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };
  const goBack = () => {
    history.goBack();
  };

  return (
    <div>
      <h1>{treeToDisplay.name}</h1>
      <button onClick={goBack}>Back</button>
      <div>
        <section className="myTreesItem">
          <h3>Date of birth: {formatDate(treeToDisplay.dob)}</h3>
          <h3>{renderLastActionDates()}</h3>
          <h3>Notes: {treeToDisplay.notes}</h3>
          <h3>Images:</h3>
          <div>
            {imagesToDisplay.map((image) => (
              <img
                key={image.id}
                src={`data:${image.mimetype};base64,${arrayBufferToBase64(
                  image.image_data.data
                )}`}
                alt={image.filename}
                style={{ maxWidth: '200px', margin: '10px' }}
              />
            ))}
          </div>
          <Link to={`/editTree/${treeToDisplay.id}`}>Edit</Link>
          <br />
          <br />
          <Link to={`/careActionForm/${treeToDisplay.id}`}>
            Care Action Form
          </Link>
          <br />
          <br />
          <Link to={`/imageUpload/${treeToDisplay.id}`}>Upload Image</Link>
          <br />
          <br />
          <button onClick={handleDelete}>Delete</button>
          <br />
          <br />
        </section>
      </div>
    </div>
  );
}

export default MyTreesItem;
