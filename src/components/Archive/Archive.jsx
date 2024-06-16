import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-CA'); // 'en-CA' for YYYY-MM-DD format
};

function Archive() {
  const dispatch = useDispatch();
  const history = useHistory();
  const trees = useSelector((store) => store.trees);
  const imagesToDisplay = useSelector((store) => store.allImages) || [];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        dispatch({ type: 'FETCH_TREES' }),
        dispatch({ type: 'FETCH_ALL_IMAGES' })
      ]);
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  const displayTreeItem = (treeToDisplay) => {
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

  const renderImagesForTree = (treeId) => {
    return imagesToDisplay
      .filter((image) => image.tree_id === treeId)
      .map((image) => (
        <img
          key={image.id}
          src={`data:${image.mimetype};base64,${arrayBufferToBase64(image.image_data.data)}`}
          alt={image.filename}
          style={{ maxWidth: '200px', margin: '10px' }}
        />
      ));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <h1>SOLD</h1>
      <section className="archiveSold">
        {trees.filter(tree => tree.status_id === 2).map((tree) => (
          <div
            onClick={() => displayTreeItem(tree.id)}
            id={tree.id}
            key={tree.id}
          >
            <h3>{tree.name}</h3>
            <div>{renderImagesForTree(tree.id)}</div>
            <h3>{formatDate(tree.dob)}</h3>
            <p>{tree.notes}</p>
          </div>
        ))}
      </section>

      <h1>R.I.P.</h1>
      <section className="archiveRip">
        {trees.filter(tree => tree.status_id === 4).map((tree) => (
          <div
            onClick={() => displayTreeItem(tree.id)}
            id={tree.id}
            key={tree.id}
          >
            <h3>{tree.name}</h3>
            <div>{renderImagesForTree(tree.id)}</div>
            <h3>{formatDate(tree.dob)}</h3>
            <p>{tree.notes}</p>
          </div>
        ))}
      </section>

      <h1>Gifted</h1>
      <section className="archiveGifted">
        {trees.filter(tree => tree.status_id === 3).map((tree) => (
          <div
            onClick={() => displayTreeItem(tree.id)}
            id={tree.id}
            key={tree.id}
          >
            <h3>{tree.name}</h3>
            <div>{renderImagesForTree(tree.id)}</div>
            <h3>{formatDate(tree.dob)}</h3>
            <p>{tree.notes}</p>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Archive;