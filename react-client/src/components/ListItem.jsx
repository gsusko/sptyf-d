import React from 'react';

const ListItem = (props) => {
  return (
    <div>
      <div>
        <span>{props.item.name} by {props.item.artists[0].name}</span>
        <span><button onClick={() => {props.handlePlayButton(props.item.preview_url)}}>Play</button></span>
        <span><button onClick={() => {props.handlePauseButton()}}>Pause</button></span>
        <span><button onClick={() => {props.handleStopButton()}}>Stop</button></span>
      </div>
      <span><img src={props.item.album.images[2].url}/></span>
    </div>
  );
};

export default ListItem;
