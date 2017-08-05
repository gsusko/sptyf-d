import React from 'react';

const MusicPlayer = (props) => {
  console.log(props)
  return (
    <div className="MusicPlayer">
      <div></div>
      <div><img src={props.currentSong.album.images[1].url}/></div>
    </div>
  )
}

export default MusicPlayer;
