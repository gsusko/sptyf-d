import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4> List Component </h4>
    { props.items.map(item => <ListItem item={item} key={item.id} handlePlayButton={props.handlePlayButton} handleStopButton={props.handleStopButton} handlePauseButton={props.handlePauseButton}/>)}
  </div>
)

export default List;
