import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import selectedTree from "../../redux/reducers/selectedTree.reducer";





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
      <h3>{tree.name}</h3>
      <section className="myTreesItem">
        {tree.map((tree) => {
          return (
            <div id={tree.id} key={tree.id}>
              <h3>{tree.name}</h3>
              <img src={`/${tree.images}`} />
              <h3>{tree.dob}</h3>
            </div>
          )
        })}
      </section>

    
    </div>
  )

}

export default MyTreesItem;