import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      {/* <p>Your ID is: {user.id}</p> */}
      <LogOutButton className="btn" />
      <button>My Trees</button>
      <button>Add Tree</button>
      <button>Archive</button>
      <button>Links</button>
      <Link className="navLink" to="/addTree">
              Add New Tree
            </Link>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
