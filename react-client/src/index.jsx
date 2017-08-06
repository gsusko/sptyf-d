import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Search from './components/Search.jsx';
import Voice from './components/Voice.jsx';
const config = require('../../config.js')


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
    this.handleTrackSearch('swimming pools');
    // this.retrieve('Swimming Pools');
    if (annyang) {
      var context = this;
      var commands = {
        'pause': function () {
          context.handleStopButton();
          annyang.start();
        },
        'play *song': function (song) {
          console.log(song);
          if (song.toLowerCase() === 'first song' || song.toLowerCase() === 'first') {
            var url = context.state.items[0].preview_url;
            context.handlePlayButton(url);
          } else if (song.toLowerCase() === 'second song' || song.toLowerCase() === 'second') {
            var url = context.state.items[1].preview_url;
            context.handlePlayButton(url);
          } else if (song.toLowerCase() === 'third song' || song.toLowerCase() === 'third') {
            var url = context.state.items[2].preview_url;
            context.handlePlayButton(url);
          } else if (song.toLowerCase() === 'fourth song' || song.toLowerCase() === 'fourth') {
            var url = context.state.items[3].preview_url;
            context.handlePlayButton(url);
          } else if (song.toLowerCase() === 'fifth song' || song.toLowerCase() === 'fifth') {
            var url = context.state.items[4].preview_url;
            context.handlePlayButton(url);
          } else {
            for (var i = 0; i < context.state.items.length; i++) {
              if (context.state.items[i].name.includes(song)) {
                var url = context.state.items[i].preview_url;
                context.handlePlayButton(url);
                break;
              }
            }
          }

          annyang.start();
        },
        'search for *song': function (song) {
          console.log(song)
          context.handleTrackSearch(song);
          annyang.start();
        },
        'search and play *song': function(song) {
          context.handleTrackSearch(song);
          setTimeout(() => {var url = context.state.items[0].preview_url; context.handlePlayButton(url)}, 1300);


        },
        ':nomatch': function (message) {
          console.log("sorry, I don't understand");
        }

      };
      annyang.addCommands(commands);
      annyang.start();
    }
  }

  retrieve(term) {
    var context = this;
    var results;
    $.ajax({
      url: '/items',
      method: 'GET',
      data: {
        term: term
      },
      contentType: 'application/json',
      success: function(data) {
        results = data.slice(0, 5);
        // context.setState({
        //   items: results
        // })
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onEnter(event) {
    if (event.keyCode === 13) {
      this.handleTrackSearch(event.target.value);
    }
  }

  handleTrackSearch(query) {
    $.post({
      url: '/items',
      data: JSON.stringify({term: query}),
      dataType: 'application/json',
      success: function(data) {
        // console.log(data);
      },
      error: function(data) {
      }
    });

    var context = this;
    $.ajax({
        url: 'https://api.spotify.com/v1/search/',
        data: {
            query: query,
            type: 'track',
            limit: 20
        },
        headers: {
         'Authorization': 'Bearer ' + config.TOKEN
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
      <h1 id="header">sptfy'd</h1>
      <div><Search onEnter={this.onEnter.bind(this)} handleTrackSearch={this.handleTrackSearch.bind(this)}/></div>
      <div><List items={this.state.items} handlePlayButton={this.handlePlayButton.bind(this)} handleStopButton={this.handleStopButton.bind(this)} handlePauseButton={this.handlePauseButton.bind(this)}/></div>
    </div>
  )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
