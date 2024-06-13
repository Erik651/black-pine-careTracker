import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
      <p>Timing is everything when it comes to developing quality Black Pine Bonsai trees. All trees require the same basic steps to create bonsai, but the timing of these steps can vary dramatically depending on species. Pines grow what is known as a candle. These candles develop into the needles and eventually into a branch.  The majority of pines grow a single flush per growing season. This means that each season the trees grow one flush of candles. The Black Pine grows two flushes pre season; double-flush. The Black Pine having multiple flushes offers the bonsai artist the opportunity, if done at the right time, to keep balanced growth by timely fertilizing, pruning(de-candling), wiring, and repotting. Taking these steps at the wrong time can lead to undesirable growth, weakening the tree or even killing your precious little tree.  I have experienced the latter more times than I would like to admit to here. The Black Pine CareTracker is designed to help the Black Pine care taker know when to take timely care actions. 
The Black Pine Care Tracker achieves this by tracking the ideal times of the year to prune(de-candle), fertilize, repot and wire. It displays to the user the ideal date for each step.  
The User will be able to record the date that care actions are taken and the Black Pine CareTracker will display to the user the next ideal time for care actions to be taken again. Also the user will be able to save notes for individual trees, save resource links in the form of url links, upload photos(stretch goal), and maintain an archive of trees that have been sold, gifted or passed on to the great forest in the sky. The goal of the Black Pine CareTracker is to help the user keep their Black Pine trees alive, thrive and develop into the best possible bonsai.
</p>
      </div>
    </div>
  );
}

export default AboutPage;
