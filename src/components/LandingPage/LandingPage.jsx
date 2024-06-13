import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();
  const images = useSelector((store) => store.images);
  console.log('images', images);
  useEffect(() => {
    console.log('in LandingPage useEffect');
    dispatchEvent({ type: 'FETCH_IMAGES' });
  }, []);

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          {images.map((image) => {
            return (
              <img src={image.image_data}/>
            )
          })}
          <p>
            Timing is everything when it comes to developing quality Black Pine
            Bonsai trees. <p>All trees require the same basic steps to create
            bonsai, but the timing of these steps can vary dramatically
            depending on species.</p> Pines grow what is known as a candle. These
            candles develop into the needles and eventually into a branch. The
            majority of pines grow a single flush per growing season. This means
            that each season the trees grow one flush of candles. The Black Pine
            grows two flushes pre season; double-flush. The Black Pine having
            multiple flushes offers the bonsai artist the opportunity, if done
            at the right time, to keep balanced growth by timely fertilizing,
            pruning(de-candling), wiring, and repotting. Taking these steps at
            the wrong time can lead to undesirable growth, weakening the tree or
            even killing your precious little tree. I have experienced the
            latter more times than I would like to admit to here. The Black Pine
            CareTracker is designed to help the Black Pine care taker know when
            to take timely care actions. The Black Pine Care Tracker achieves
            this by tracking the ideal times of the year to prune(de-candle),
            fertilize, repot and wire. It displays to the user the ideal date
            for each step. The User will be able to record the date that care
            actions are taken and the Black Pine CareTracker will display to the
            user the next ideal time for care actions to be taken again. Also
            the user will be able to save notes for individual trees, save
            resource links in the form of url links, upload photos(stretch
            goal), and maintain an archive of trees that have been sold, gifted
            or passed on to the great forest in the sky. The goal of the Black
            Pine CareTracker is to help the user keep their Black Pine trees
            alive, thrive and develop into the best possible bonsai.
          </p>
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
