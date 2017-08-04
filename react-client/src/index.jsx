import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Search from './components/Search.jsx';
import Voice from './components/Voice.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  componentDidMount() {
    this.handleSearch('to the top');
  }

  //search function
  handleSearch(query) {
    //call get request on API
    var options = {
      q: query,
      artist: 'kendrick'
    }
    var accessToken = "BQClxkwnjrhHxWqinetkaSdDdAVi06oJw7jgWm7d2s1Ef8DAoL2yaQF3K9Okeo0B_N5Zmw6U76zLRrs6uwMPEIk1TOMZpceyokXW1ibJOiw3FtGnzh27JYdevzA6mlXuJEFLkIyp_JrJdVM";
    var context = this;
    $.ajax({
        url: 'https://api.spotify.com/v1/search',
        data: {
            q: query,
            type: 'track',
            preview_url: 'true'
        },
        headers: {
         'Authorization': 'Bearer ' + accessToken
       },
        success: function (data) {
            console.log(data)
            context.setState({
              items: data.tracks.items
            });
        }
    });
  }

  retrieve() {
    $.ajax({
      url: '/items',
      success: (data) => {
        console.log('success');
        // this.setState({
        //   items: data
        // })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    return (
      <div>
      <h1>Spotify Player</h1>
      <div><Search handleSearch={this.handleSearch.bind(this)}/></div>
      <div><Voice/></div>
      <div><List items={this.state.items}/></div>
    </div>
  )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
