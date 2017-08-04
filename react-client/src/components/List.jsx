import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4> List Component </h4>
    { props.items.map(item => <ListItem item={item} key={Math.floor(Math.random() * 100000)}/>)}
  </div>
)

export default List;
