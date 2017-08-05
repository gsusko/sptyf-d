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
      items: [],
      playing: false,
      currentTime: 0,
      song: new Audio("https://p.scdn.co/mp3-preview/f4d37e76a08217cea4ca748d7dacc321bc531ef0?cid=8897482848704f2a8f8d7c79726a70d4")
    }
  }

  componentDidMount() {
    this.handleTrackSearch('swimming');
  }

  handleTrackSearch(query) {
    $.post({
      url: '/items',
      data: JSON.stringify({term: query}),
      dataType: 'application/json',
      success: function(data) {
        console.log(data);
      },
      error: function(data) {
      }
    });

    var accessToken = "BQBA3wOgTPMaG3HHak04xp0Hd82OTvdFmjpMYW-IWS4yBtOSawHsn_KDkCFJImrLu2BqCCdvUvMpiEizk701W14_6XvuXXO2ojcXHJUhbTiDtQJUuwqC4Xdvgh-o5UDaHK1OoDcT98BoPFI";
    var context = this;
    $.ajax({
        url: 'https://api.spotify.com/v1/search/',
        data: {
            query: query,
            type: 'track',
            limit: 20
        },
        headers: {
         'Authorization': 'Bearer ' + accessToken
       },
        success: function (data) {
          var items = data.tracks.items;
          if (items.length === 0) {
            alert('no songs with that query!')
          }
          var results = [];
          items.forEach(function(item) {
            if (item.preview_url && results.length < 5) {
              results.push(item);
            }
          });
          context.setState({
            items: results
          });
        }
    });
    document.getElementById('input').value = '';
  }

  handlePlayButton(url) {
    var audio = new Audio(url);
    if (audio.src !== this.state.song.src) {
      this.state.song.pause();
      Promise.resolve(this.setState({
        song: audio,
      }))
      .then(() => {
        this.state.song.play();
      })
    }
    if (!this.state.playing) {
      Promise.resolve(this.setState({
        song: audio,
        playing: true

      }))
      .then(() => {
        this.state.song.play();
      })
    }
  }

  handlePauseButton() {
    if (this.state.playing) {
      Promise.resolve(this.setState({
        currentTime: this.state.song.currentTime,
        playing: false
      }))
      .then(() => {
        this.state.song.pause();
      })
    } else {
      Promise.resolve(this.setState({
        playing: true
      }))
      .then(() => {
        this.state.song.play();
      })
    }
  }

  handleStopButton() {
    if (this.state.playing) {
      Promise.resolve(this.setState({
        currentTime: this.state.song.currentTime,
        playing: false
      }))
      .then(() => {
        this.state.song.pause();
      })
    }
  }

  render () {
    return (
      <div>
      <h1>Spotify Player</h1>
      <div><Search handleTrackSearch={this.handleTrackSearch.bind(this)}/></div>
      <div><Voice/></div>
      <div><List items={this.state.items} handlePlayButton={this.handlePlayButton.bind(this)} handleStopButton={this.handleStopButton.bind(this)} handlePauseButton={this.handlePauseButton.bind(this)}/></div>
    </div>
  )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
