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
                <img src={`/${tree.images}`} />
                <h3>Date of birth: {formatDate(tree.dob)}</h3>
              </div>
            );
          })}
      </section>
    </main>
  );
}

export default MyTrees;
