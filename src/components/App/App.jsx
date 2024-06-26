import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import MyTrees from '../MyTrees/MyTrees';
import AddTree from '../AddTree/AddTree';
import Archive from '../Archive/Archive';
import Links from '../Links/Links';
import EditTree from '../EditTree/EditTree';
import MyTreesItem from '../MyTreesItem/MyTreesItem';
import DecandleResources from '../DecandleResources/DecandleResources';
import RepotResources from '../RepotResources/RepotResources';
import FertilizeResources from '../FertilizeResources/FertilizeResources';
import WireResources from '../WireResources/WireResources';
import PruneResources from '../PruneResources/PruneResources';
import ImageUpload from '../ImageUpload/ImageUpload';
import './App.css';
import CareActionForm from '../CareActionForm/CareActionForm';

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:5173 will redirect to localhost:5173/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:5173/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:5173/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:5173/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/myTrees">
            <MyTrees />
          </ProtectedRoute>

          <ProtectedRoute exact path="/editTree/:id">
            <EditTree />
          </ProtectedRoute>

          <ProtectedRoute exact path="/careActionForm/:id">
            <CareActionForm />
          </ProtectedRoute>

          <ProtectedRoute exact path="/myTreesItem/:id">
            <MyTreesItem />
          </ProtectedRoute>

          <ProtectedRoute exact path="/addTree">
            <AddTree />
          </ProtectedRoute>

          <ProtectedRoute exact path="/archive">
            <Archive />
          </ProtectedRoute>

          <ProtectedRoute exact path="/links">
            <Links />
          </ProtectedRoute>

          <ProtectedRoute exact path="/repot">
            <RepotResources />
          </ProtectedRoute>

          <ProtectedRoute exact path="/fertilize">
            <FertilizeResources />
          </ProtectedRoute>

          <ProtectedRoute exact path="/decandle">
            <DecandleResources />
          </ProtectedRoute>

          <ProtectedRoute exact path="/prune">
            <PruneResources />
          </ProtectedRoute>

          <ProtectedRoute exact path="/wire">
            <WireResources />
          </ProtectedRoute>

          <ProtectedRoute exact path="/imageUpload/:id">
            <ImageUpload />
          </ProtectedRoute>

          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route exact path="/registration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>

          <Route exact path="/home">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the Landing page
              <LandingPage />
            )}
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
