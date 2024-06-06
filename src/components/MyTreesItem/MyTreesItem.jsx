import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";





function MyTreesItem() {

  const dispatch = useDispatch();
  const tree = useSelector((store) => store)

}

export default MyTreesItem;