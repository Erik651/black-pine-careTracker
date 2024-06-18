import React from 'react';
import YouTube from 'react-youtube';

const repotResources = () => {
  const videos = [
    { videoId: 'GNaiTVbBEeI', title: 'At 3:20; Pruning Tip' },
    { videoId: 'KjcolFzZZeI', title: 'Title for KjcolFzZZeI' },
    { videoId: '58FmPOxEyhQ', title: 'Title for 58FmPOxEyhQ' },
  ];

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

  return (
    <div>
      {videos.map((video) => (
        <div key={video.videoId} style={{ marginBottom: '20px' }}>
          <h3>{video.title}</h3>
          <YouTube videoId={video.videoId} opts={opts} onReady={onReady} />
        </div>
      ))}
    </div>
  );
};
export default repotResources;
