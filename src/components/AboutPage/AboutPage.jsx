import React, { useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// Convert array buffer to base64
const arrayBufferToBase64 = (buffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

function AboutPage() {
  const dispatch = useDispatch();
  const imagesToDisplay = useSelector((store) => store.allImages);

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_IMAGES' });
  }, [dispatch]);

  return (
    <div className="container">
      <div>
        <h1>Black Pine CareTracker</h1>
        <p>
          Timing is everything when it comes to applying care for quality Black
          Pine Bonsai trees.
        </p>
      </div>
      <Example images={imagesToDisplay} />
    </div>
  );
}

function Example({ images }) {
  return (
    <Carousel>
      {images.map((image, i) => (
        <Item key={i} image={image} />
      ))}
    </Carousel>
  );
}

function Item({ image }) {
  return (
    <Paper>
      <img
        src={`data:${image.mimetype};base64,${arrayBufferToBase64(
          image.image_data.data
        )}`}
        alt={image.filename}
        style={{ maxWidth: '200px', margin: '10px' }}
      />
      <Button className="CheckButton">Check it out!</Button>
    </Paper>
  );
}

export default AboutPage;
