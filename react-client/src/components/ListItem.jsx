import React from 'react';

const ListItem = (props) => {
  console.log(props)
  return (
    <div>
      { props.item.album.images[0].url}
    </div>
  );
};

export default ListItem;
