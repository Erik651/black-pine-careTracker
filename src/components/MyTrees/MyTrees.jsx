import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MyTrees.css';

function MyTrees() {
  const dispatch = useDispatch();
  const history = useHistory();
  const imagesToDisplay = useSelector((store) => store.singleTreeImages) || [];
  const trees = useSelector((store) => store.trees);
  console.log('trees', trees);
  console.log('imagesToDisplay', imagesToDisplay); // Ensure this logs correct data

  useEffect(() => {
    console.log('in useEffect');
    dispatch({ type: 'FETCH_TREES' });
    dispatch({ type: 'FETCH_SINGLE_IMAGES' });
  }, [dispatch]);

  const displayTreeItem = useCallback((treeToDisplay) => {
    console.log(treeToDisplay);
    history.push(`/myTreesItem/${treeToDisplay}`);
  }, [history]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-CA'); // 'en-CA' for YYYY-MM-DD format
  };
  
  const ImageList = React.memo(({ images }) => {
    const arrayBufferToBase64 = useCallback((buffer) => {
      let binary = '';
      const bytes = new Uint8Array(buffer);
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return window.btoa(binary);
    }, []);
  
    console.log('ImageList images:', images);
    
    return (
      <div>
        {images.map((image) => (
          <img
            key={image.id}
            src={`data:${image.mimetype};base64,${arrayBufferToBase64(image.image_data.data)}`}
            alt={image.filename}
            style={{ maxWidth: '200px', margin: '10px' }}
          />
        ))}
      </div>
    );
  });

  return (
    <main>
      <h1>My Trees</h1>
      <section className="myTrees">
        {trees
          .filter((tree) => tree.status_id === 1)
          .map((tree) => {
            // Filter images that match the current tree.id
            const filteredImages = imagesToDisplay.filter(image => {
              console.log(`Comparing tree.id ${tree.id} with image.tree_id ${image.tree_id}`);
              return image.tree_id === tree.id;
            });
            console.log('filteredImages for tree', tree.id, filteredImages); // Ensure this logs correct data
            return (
              <div
                onClick={() => displayTreeItem(tree.id)}
                id={tree.id}
                key={tree.id}
              >
                <h3>{tree.name}</h3>
                <ImageList images={filteredImages} />
                <h3>Date of birth: {formatDate(tree.dob)}</h3>
              </div>
            );
          })}
      </section>
    </main>
  );
}

export default MyTrees;