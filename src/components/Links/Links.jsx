import React from 'react';
import YouTube from 'react-youtube';

const Links = () => {
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  const onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  return <YouTube videoId="2g811Eo7K8U" opts={opts} onReady={onReady} />;
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

