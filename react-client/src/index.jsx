import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Search from './components/Search.jsx';
// const config = require('../../config.js');
const ann = require('../../helpers/annyang.js');


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
    this.handleTrackSearch('The Chain');
    ann.speech(this);
  }

  onEnter(event) {
    if (event.keyCode === 13) {
      this.handleTrackSearch(event.target.value);
    }
  }

  handleTrackSearch(query) {
    var context = this;
    $.ajax({
        url: 'https://api.spotify.com/v1/search/',
        data: {
            query: query,
            type: 'track',
            limit: 20
        },
        headers: {
         'Authorization':'Bearer ' + process.env.TOKEN || 'Bearer ' + config.TOKEN
       },
        success: function (data) {
          var items = data.tracks.items;
          if (items.length === 0) {
            alert('no songs with that search!');
          } else {
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
      <div id="rendering">
      <h4 id="listener"></h4>
      <h1 id="header">sptfy'd</h1>
      <div><Search onEnter={this.onEnter.bind(this)} handleTrackSearch={this.handleTrackSearch.bind(this)}/></div>
      <div><List items={this.state.items} handlePlayButton={this.handlePlayButton.bind(this)} handleStopButton={this.handleStopButton.bind(this)} handlePauseButton={this.handlePauseButton.bind(this)}/></div>
    </div>
  )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
