import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MyTrees.css';

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-CA'); // 'en-CA' for YYYY-MM-DD format
};

function MyTrees() {
  const dispatch = useDispatch();
  const history = useHistory();
  const imagesToDisplay = useSelector((store) => store.allImages) || [];
  const trees = useSelector((store) => store.trees);
  console.log('trees', trees);
  useEffect(() => {
    console.log('in useEffect');
    dispatch({ type: 'FETCH_TREES' });
    dispatch({ type: 'FETCH_ALL_IMAGES'  });
  }, []);

  const displayTreeItem = (treeToDisplay) => {
    console.log(treeToDisplay);
    history.push(`/myTreesItem/${treeToDisplay}`);
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

  return (
    <main>
      <h1>My Trees</h1>
      <p>{trees.name}</p>
      <section className="myTrees">
        {trees
          .filter((tree) => tree.status_id === 1)
          .map((tree) => {
            return (
              <div
                onClick={(event) => displayTreeItem(tree.id)}
                id={tree.id}
                key={tree.id}
              >
                <h3>{tree.name}</h3>
                {/* <img src={`/${tree.images}`} /> */}
                <div>
            {imagesToDisplay.map((image) => {
              console.log(image.image_data); // Log the image data to inspect
              return (
                
                <img
                  key={image.id}
                  src={`data:${image.mimetype};base64,${arrayBufferToBase64(image.image_data.data)}`}
                  alt={image.filename}
                  style={{ maxWidth: '200px', margin: '10px' }}
                />
              );
            })}
          </div>
                <h3>Date of birth: {formatDate(tree.dob)}</h3>
              </div>
            );
          })}
      </section>
    </main>
  );
}

export default MyTrees;
