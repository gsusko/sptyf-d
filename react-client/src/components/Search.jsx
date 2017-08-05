import React from 'react';

const Search = (props) => {
  return (
    <div className="search-bar form-inline search">
      <input className="form-control" type="search" id="input" placeholder="Search For a Song" onKeyUp={(e) => {props.onEnter(e)}} type="text"/>
      <button className="btn hidden-sm-down" onClick={() => {props.handleTrackSearch(document.getElementById('input').value)}}>
        <span className="glyphicon glyphicon-search">Search</span>
      </button>
    </div>
  );
};

export default Search;
