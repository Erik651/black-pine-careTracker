import React from 'react';
import YouTube from 'react-youtube';
import { useHistory } from 'react-router-dom';

function RepotResources() {
  
  const history = useHistory();

  const videos = [
    { videoId: '1Tvyam459sQ', title: 'Unlock the Secrets to Thriving Japanese Black Pine Bonsai Trees. At 57:45, Repotting Tip. Bonsai-En @BonsaiEn' },
    { videoId: 'jbttuUsq5V8&t', title: 'Japanese Black Pine Repotting basics - ABC. Terry Erasmus @TerryErasmusbonsai' },
    { videoId: 'VOzd3ZqaHBI', title: 'Repotting My Japanese Black Pine, The Bonsai Zone, Feb 2024. Nigel Saunders @TheBonsaiZone' },
  ];

  const urlLinks = [
    {  url: 'https://bonsaitonight.com/2011/04/22/how-to-repot-a-young-japanese-black-pine-1-of-2/', title: 'How to repot a young Japanese black pine (1 of 2). by JONAS DUPUICH'  },
    {  url: 'https://bonsaitonight.com/2011/04/26/how-to-repot-a-young-japanese-black-pine-2-of-2/', title: 'How to repot a young Japanese black pine (2 of 2). by JONAS DUPUICH'  },
    {  url: 'https://www.bonsaitree.co.za/blogs/tree-talk/old-imported-japanese-black-pine-gets-a-repot', title: 'OLD, IMPORTED JAPANESE BLACK PINE GETS A REPOT. https://www.bonsaitree.co.za/'  }
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
export default RepotResources;
