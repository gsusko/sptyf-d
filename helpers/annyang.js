// var items = require('../database-mongo/index.js');
var $ = require('jquery');
module.exports.speech = function(context) {
  if (annyang) {
    var commands = {
      'pause': function () {
        context.handlePauseButton();
        document.getElementById('listener').innerHTML = 'Paused';
        annyang.start();
      },
      'resume': function () {
        context.handlePauseButton();
        document.getElementById('listener').innerHTML = 'Resuming your song';
        annyang.start();
      },
      'stop': function () {
        context.handleStopButton();
        document.getElementById('listener').innerHTML = '';
        annyang.start();
      },
      'play *song': function (song) {
        console.log(song);
        // document.getElementById('listener').innerHTML = 'Playing ' + song;
        if (song.toLowerCase() === 'first song' || song.toLowerCase() === 'first') {
          var url = context.state.items[0].preview_url;
          context.handlePlayButton(url);
          document.getElementById('listener').innerHTML = 'Playing ' + context.state.items[0].name + ' by ' + context.state.items[0].artists[0].name;
        } else if (song.toLowerCase() === 'second song' || song.toLowerCase() === 'second') {
          var url = context.state.items[1].preview_url;
          context.handlePlayButton(url);
          document.getElementById('listener').innerHTML = 'Playing ' + context.state.items[1].name + ' by ' + context.state.items[1].artists[0].name;
        } else if (song.toLowerCase() === 'third song' || song.toLowerCase() === 'third') {
          var url = context.state.items[2].preview_url;
          context.handlePlayButton(url);
          document.getElementById('listener').innerHTML = 'Playing ' + context.state.items[2].name + ' by ' + context.state.items[2].artists[0].name;
        } else if (song.toLowerCase() === 'fourth song' || song.toLowerCase() === 'fourth') {
          var url = context.state.items[3].preview_url;
          context.handlePlayButton(url);
          document.getElementById('listener').innerHTML = 'Playing ' + context.state.items[3].name + ' by ' + context.state.items[3].artists[0].name;
        } else if (song.toLowerCase() === 'fifth song' || song.toLowerCase() === 'fifth') {
          var url = context.state.items[4].preview_url;
          context.handlePlayButton(url);
          document.getElementById('listener').innerHTML = 'Playing ' + context.state.items[4].name + ' by ' + context.state.items[4].artists[0].name;
        } else {
          for (var i = 0; i < context.state.items.length; i++) {
            if (context.state.items[i].name.toLowerCase().includes(song.toLowerCase())) {
              var url = context.state.items[i].preview_url;
              context.handlePlayButton(url);
              document.getElementById('listener').innerHTML = 'Playing ' + context.state.items[i].name + ' by ' + context.state.items[i].artists[0].name;
              break;
            }
          }
        }
        annyang.start();
      },
      'artist play *artist': function(artist) {
        console.log(artist);
        document.getElementById('listener').innerHTML = 'Playing ' + artist;
        for (var i = 0; i < context.state.items.length; i++) {
          if (context.state.items[i].artists[0].name.toLowerCase().includes(artist.toLowerCase())) {
            var url = context.state.items[i].preview_url;
            context.handlePlayButton(url);
            document.getElementById('listener').innerHTML = 'Playing ' + context.state.items[i].name + ' by ' + artist;
            break;
          }
        }
      },
      'search for *song': function (song) {
        console.log(song);
        context.handleTrackSearch(song);
        document.getElementById('listener').innerHTML = 'Searching for ' + song;
        annyang.start();
      },
      'search and play *song': function(song) {
        context.handleTrackSearch(song);
        document.getElementById('listener').innerHTML = 'Searching for ' + song;
        setTimeout(() => {
          var url = context.state.items[0].preview_url;
          context.handlePlayButton(url);
        }, 1300);
        setTimeout(() => {
        document.getElementById('listener').innerHTML = 'Playing ' + context.state.items[0].name + ' by ' + context.state.items[0].artists[0].name;
        }, 1300);
      },
      'favorite *song': function(song) {
        console.log(song);
        for (var i = 0; i < context.state.items.length; i++) {
          var results = [];
          if (context.state.items[i].name.toLowerCase().includes(song.toLowerCase())) {
            results.push(context.state.items[i]);
            $.post({
              url: '/items',
              data: JSON.stringify(results),
              dataType: 'application/json',
              success: function(data) {
                // console.log('success');
              },
              error: function(data) {
                // console.log('error')
              }
            });
            document.getElementById('listener').innerHTML = 'Adding ' + context.state.items[i].name + ' by ' + context.state.items[i].artists[0].name + ' to your favorites';
            break;
          }
        }
      },
      'show favorites': function() {
        $.get({
          url: '/items',
          contentType: 'application/json',
          success: function(data) {
            var results = [];
            for (var i = 0; i < data.length; i++) {
              var currentId = data[i].id;
              var exists = false;
              for (var j = 0; j < results.length; j++) {
                if (results[j].id === currentId) {
                  exists = true;
                }
              }
              if (!exists && results.length < 5) {
                results.push(data[i]);
              }
            }
            context.setState({
              items: results
            });
          },
          error: function(data) {
            console.log(data);
          }
        });
        document.getElementById('listener').innerHTML = 'Here are your favorite songs based on popularity!';
      },
      'order by time': function() {
        $.get({
          url: '/items',
          data: {
            term: 'reorder'
          },
          contentType: 'application/json',
          success: function(data) {
            var results = [];
            for (var i = 0; i < data.length; i++) {
              var currentId = data[i].id;
              var exists = false;
              for (var j = 0; j < results.length; j++) {
                if (results[j].id === currentId) {
                  exists = true;
                }
              }
              if (!exists && results.length < 5) {
                results.push(data[i]);
              }
            }
            context.setState({
              items: results
            });
            document.getElementById('listener').innerHTML = 'Here are your favorite songs based on when they were added!'
          },
          error: function(data) {
          }
        });
      },
      'order by popularity': function () {
        $.get({
          url: '/items',
          contentType: 'application/json',
          success: function(data) {
            var results = [];
            for (var i = 0; i < data.length; i++) {
              var currentId = data[i].id;
              var exists = false;
              for (var j = 0; j < results.length; j++) {
                if (results[j].id === currentId) {
                  exists = true;
                }
              }
              if (!exists && results.length < 5) {
                results.push(data[i]);
              }
            }
            context.setState({
              items: results
            });
          },
          error: function(data) {
            console.log(data);
          }
        });
        document.getElementById('listener').innerHTML = 'Here are your favorite songs based on popularity!';
      },
      'remove *song': function(song) {
        $.get({
          url: '/items',
          contentType: 'application/json',
          data: {
            song: song
          },
          success: function(data) {
            var results = [];
            for (var i = 0; i < data.length; i++) {
              var currentId = data[i].id;
              var exists = false;
              for (var j = 0; j < results.length; j++) {
                if (results[j].id === currentId) {
                  exists = true;
                }
              }
              if (!exists && results.length < 5) {
                results.push(data[i]);
              }
            }
            context.setState({
              items: results
            })
          },
          error: function(data) {
            console.log(data);
          }
        })
        document.getElementById('listener').innerHTML = song + ' has been removed from your favorites';
      },
      ':nomatch': function (message) {
        console.log("sorry, I don't understand");
        document.getElementById('listener').innerHTML = "Sorry, I don't understand your request";
      }

    };
    annyang.addCommands(commands);
    annyang.start();
  }
}
