import React from 'react';
import YouTube from 'react-youtube';
import { useHistory } from 'react-router-dom';

function WireResources() {

  const history = useHistory();

  const videos = [
    { videoId: 'xwlNIVdQwdU', title: 'How to Wire a Japanese Black Pine Pre-Bonsai. Bonsai Society @BonsaiSociety' },
    { videoId: '5TwbZSPNJek', title: 'Wiring & Shaping Japanese Black Pine Part 2. Herons Bonsai @HeronsBonsaiUK' },
    { videoId: 'EP5wrllNRrc', title: 'Repotting And Wiring My Mikawa Japanese Black Pine Seedling. Brandon Barrera @everythingbonsai3758' },

  ];

  const urlLinks = [
    {  url: 'https://bonsaitonight.com/2014/07/18/developing-black-pine-setting-the-first-curves/', title: 'Developing black pine – setting the first curves by JONAS DUPUICH'  },
    {  url: 'https://nichigobonsai.com/2011/09/12/japanese-black-pine-re-wire/', title: 'Japanese black pine re-wire. Nichigo Bonsai, Bonsai from Australia'  },
   {  url: 'https://bonsaitonight.com/2013/03/29/wiring-3-year-old-black-pines/', title: 'Wiring 3 year-old black pines. by JONAS DUPUICH'  },
  ]
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
  };

  const onReady = (event) => {
    event.target.pauseVideo();
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <div>
      <button onClick={goBack}>Back</button>
      <div>
        <h3>Additional Resources:</h3>
        {urlLinks.map((link, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">{link.title}</a>
          </div>
        ))}
      </div>
      {videos.map((video) => (
        <div key={video.videoId} style={{ marginBottom: '20px' }}>
          <h3>{video.title}</h3>
          <YouTube videoId={video.videoId} opts={opts} onReady={onReady} />
        </div>
      ))}
    </div>
  );
};

export default WireResources;
