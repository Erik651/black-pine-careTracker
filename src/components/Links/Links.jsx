import React from 'react';
import { Link } from 'react-router-dom';

const Links = () => {
  return (
    <div>
      <Link className="navLink" to="/repot">Repot</Link>
      <Link className="navLink" to="/fertilize">Fertilize</Link>
      <Link className="navLink" to="/wire">Wire</Link>
      <Link className="navLink" to="/prune">Prune</Link>
      <Link className="navLink" to="/decandle">Decandle</Link>
    </div>
  );
};

export default Links;
