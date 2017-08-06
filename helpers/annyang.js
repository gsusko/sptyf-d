// var items = require('../database-mongo/index.js');
var $ = require('jquery');
module.exports.speech = function(context) {
  if (annyang) {
    var commands = {
      'pause': function () {
        context.handlePauseButton();
        annyang.start();
      },
      'resume': function () {
        context.handlePauseButton();
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
            if (context.state.items[i].name.toLowerCase().includes(song.toLowerCase())) {
              var url = context.state.items[i].preview_url;
              context.handlePlayButton(url);
              break;
            }
          }
        }
        annyang.start();
      },
      'artist play *artist': function(artist) {
        console.log(artist);
        for (var i = 0; i < context.state.items.length; i++) {
          if (context.state.items[i].artists[0].name.toLowerCase().includes(artist.toLowerCase())) {
            var url = context.state.items[i].preview_url;
            context.handlePlayButton(url);
            break;
          }
        }
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
      'favorite *song': function(song) {
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
            })
          },
          error: function(data) {
            console.log(data);
          }
        })
      },
      ':nomatch': function (message) {
        console.log("sorry, I don't understand");
      }

    };
    annyang.addCommands(commands);
    annyang.start();
  }
}
