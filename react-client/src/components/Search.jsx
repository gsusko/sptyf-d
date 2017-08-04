import React from 'react';

const Search = (props) => {
  return (
    <div className="search-bar form-inline">
      <input className="form-control" id="input" type="text"/>
      <button className="btn hidden-sm-down" onClick={() => {props.handleSearch(document.getElementById('input').value)}}>
        <span className="glyphicon glyphicon-search">Search</span>
      </button>
    </div>
  );
};

export default Search;
