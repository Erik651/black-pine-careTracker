import React from 'react';
import YouTube from 'react-youtube';
import { useHistory } from 'react-router-dom';


  function  FertilizeResources() {

    const history = useHistory();

    const videos = [
      { videoId: "Snq-L0Ut4wY", title: "At 19:24, Fertilize Guide" },
      { videoId: "1Zk2ncE2Frg", title: "At 33:24, Fertilize Guide" },
      { videoId: "1Tvyam459sQ", title: "At 11:06, Fertilize Guide" },
    ];

    const urlLinks = [
      {  url: 'https://bonsaitonight.com/2017/03/21/fertilize-black-pine-bonsai/', title: 'How to fertilize black pine bonsai. by JONAS DUPUICH'  },
      {  url: 'https://greg.app/japanese-black-pine-fertilizer/', title: 'Fertilizing My Japanese Black Pine. By Kiersten Rankel'  },
      {  url: 'https://www.bonsainut.com/threads/my-japanese-black-pine-has-light-green-needles-so-do-i-need-to-change-the-soil.63045/', title: 'My Japanese black pine has light green needles so do I need to change the soil? Bonsai Nut Forum'  }
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



export default FertilizeResources;