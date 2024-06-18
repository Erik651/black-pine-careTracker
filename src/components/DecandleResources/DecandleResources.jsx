import React from 'react';
import YouTube from 'react-youtube';
import { useHistory } from 'react-router-dom';

function DecandleResources() {
  const history = useHistory();
  
  const videos = [
    { videoId: '1Zk2ncE2Frg', title: 'At 6:15; Decandleing Tip' },
    { videoId: 'KVQ1dAIcHxA', title: 'Decandling a Large Field Grown Black Pine Bonsai. Bonsaify @Bonsaify' },
    { videoId: 'XvQxy5vHlSg', title: 'Japanese Black Pine - Decandling (Summer). Bonsai Matsu @BonsaiMatsu' },
  ];

  const urlLinks = [
    {  url: 'https://bonsaitonight.com/2016/07/22/decandling-black-pine-bonsai-overview/', title: 'Decandling black pine bonsai, an in-depth guide.  by JONAS DUPUICH'  },
    {  url: 'https://www.bonsaify.com/blogs/news-and-more/nine-things-you-need-to-know-about-decandling-japanese-black-pine', title: 'Nine Things You Need to Know About Decandling Japanese Black Pine. Bonsaify @Bonsaify'  },
  {  url: 'https://crataegus.com/2013/06/03/time-to-decandle-your-black-pines/', title: 'Time to Decandle your Black Pines- by crataegus'  }
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

export default DecandleResources;
