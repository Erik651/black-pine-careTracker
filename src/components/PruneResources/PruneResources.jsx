import React from 'react';
import YouTube from 'react-youtube';
import { useHistory } from 'react-router-dom';

function PruneResources() {
  const history = useHistory();

  const videos = [
    { videoId: '1Tvyam459sQ', title: 'At 16:18; Pruning Tip' },
    { videoId: 'omJIkworeRU', title: 'How to Prune Japanese Black Pine Bonsai. Bonsai Heirloom @bonsaiheirloom' },
    { videoId: '8JWRenbHNys', title: 'How to Prune and Decandle your Black Pine Bonsai. Eastern Leaf @easternleaf' },
  ];

  const urlLinks = [
    {  url: 'https://capitalbonsai.wordpress.com/2012/02/01/pruning-a-large-japanese-black-pine/', title: 'Pruning a large Japanese Black Pine. by aarinpackard'  },
    {  url: 'https://greg.app/how-to-prune-japanese-black-pine/', title: 'How and When Should I Cut Back My Japanese Black Pine? By Kiersten Rankel'  },
    {  url: 'https://najga.org/the-basics-on-fall-pruning-for-japanese-black-pine-trees/', title: 'The Basics on Fall Pruning for Japanese Black Pine Trees. by NAJGA Manager | Oct 29, 2023'  },
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

export default PruneResources;
