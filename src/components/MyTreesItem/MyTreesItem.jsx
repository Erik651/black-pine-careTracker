import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';

function MyTreesItem() {
  const dispatch = useDispatch();
  const tree = useSelector((store) => store.selectedTree);
  const { id: treeId } = useParams();
  useEffect(() => {
    console.log('in MyTreesItem useEffect');
    dispatch({ type: 'FETCH_SELECTED_TREE', payload: treeId });
  }, [treeId]);

  return (
    <div>
      <h1>{treeId}</h1>
      {/* <h3>{tree.name}</h3> */}
      <section className="myTreesItem">
        <div id={tree.id} key={tree.id}>
          <h3>{tree.name}</h3>
          <h3>{tree.dob}</h3>
          <img src={`/${tree.images}`} />
          <h5>{tree.notes}</h5>
          <Link to={`/editTree/${tree.id}`}>Edit</Link>
        </div>
      </section>
    </div>
  );
}

export default MyTreesItem;
