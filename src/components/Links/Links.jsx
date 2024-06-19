import React from 'react';
import { Link } from 'react-router-dom';
import repotImg from '/public/IMG_3474.jpeg';

const Links = () => {
  return (
    <div>
      <Link className="resourcesLink" to="/repot">
      <img src={repotImg} alt="Repot" />
      Repot
      </Link>
      <Link className="resourcesLink" to="/fertilize">Fertilize</Link>
      <Link className="resourcesLink" to="/wire">Wire</Link>
      <Link className="resourcesLink" to="/prune">Prune</Link>
      <Link className="resourcesLink" to="/decandle">Decandle</Link>
    </div>
  );
};

export default Links;
