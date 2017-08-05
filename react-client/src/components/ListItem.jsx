import React from 'react';

const ListItem = (props) => {
  return (
    <div>
      <div id="listItems">
        <span id="song">{props.item.name} by {props.item.artists[0].name}</span>
        <div>
          <span><button id="play" onClick={() => {props.handlePlayButton(props.item.preview_url)}}>&#9658;</button></span>
          <span><button onClick={() => {props.handlePauseButton()}}>&#9646;&#9646;</button></span>
          <span><button onClick={() => {props.handleStopButton()}}>&#9724;</button></span>
        </div>
      </div>
      <span><img src={props.item.album.images[2].url}/></span>
    </div>
  );
};

export default ListItem;
