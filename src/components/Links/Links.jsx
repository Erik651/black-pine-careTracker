import React from 'react';
import YouTube from 'react-youtube';

const Links = () => {
  const videos = [
    { videoId: "GNaiTVbBEeI", title: "At 3:20; Pruning Tip" },
    { videoId: "KjcolFzZZeI", title: "Title for KjcolFzZZeI" },
    { videoId: "58FmPOxEyhQ", title: "Title for 58FmPOxEyhQ" },
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

export default Links;
// import React from 'react';
// import YouTube from 'react-youtube';

//   Links() {
//     const opts = {
//       height: '390',
//       width: '640',
//       playerVars: {
//         // https://developers.google.com/youtube/player_parameters
//         autoplay: 1,
//       },
//     };

//     return <YouTube videoId="2g811Eo7K8U" opts={opts} onReady={this._onReady} />;
//   };

//   export default Links;
// _onReady(event) {
//   // access to player in all event handlers via event.target
//   event.target.pauseVideo();
// }

// function Links() {
//   return (
//     <div>Links
//       <p></p>
//     </div>

//   )
// }
