import React, { useEffect } from 'react';
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
  console.log('trees', trees);
  useEffect(() => {
    console.log('in useEffect');
    dispatch({ type: 'FETCH_TREES' });
  }, []);

  const displayTreeItem = (treeToDisplay) => {
    console.log(treeToDisplay);
    history.push(`/myTreesItem/${treeToDisplay}`);
  };

  return (
    <main>
      <h1>SOLD</h1>
      <section className="archiveSold">
        {trees.filter(tree => tree.status_id === 2).map((tree) => {
          return (
            <div
              onClick={(event) => displayTreeItem(tree.id)}
              id={tree.id}
              key={tree.id}
            >
              <h3>{tree.name}</h3>
              <img src={`/${tree.images}`} />
              <h3>{formatDate(tree.dob)}</h3>
              <p>{tree.notes}</p>
            </div>
          );
        })}
      </section>

<h1>R.I.P.</h1>
      <section className="archiveRip">
        {trees.filter(tree => tree.status_id === 4).map((tree) => {
          return (
            <div
              onClick={(event) => displayTreeItem(tree.id)}
              id={tree.id}
              key={tree.id}
            >
              <h3>{tree.name}</h3>
              <img src={`/${tree.images}`} />
              <h3>{formatDate(tree.dob)}</h3>
              <p>{tree.notes}</p>
            </div>
          );
        })}
      </section>

<h1>Gifted</h1>
      <section className="archiveGifted">
        {trees.filter(tree => tree.status_id === 3).map((tree) => {
          return (
            <div
              onClick={(event) => displayTreeItem(tree.id)}
              id={tree.id}
              key={tree.id}
            >
              <h3>{tree.name}</h3>
              <img src={`/${tree.images}`} />
              <h3>{formatDate(tree.dob)}</h3>
              <p>{tree.notes}</p>
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default Archive;