const request = require('request');
const rp = require('request-promise');
const db = require('../database-mongo/index.js');
const config = require('../config.js');

const getSpotifySongs = function(query) {
  var url = `https://api.spotify.com/v1/search/?q=${query}&type=track&limit=20`
  var options = {
    url: url,
    headers: {
      'Authorization': 'Bearer ' + config.TOKEN,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  }
  rp(options)
    .then(songs => {
      songs = JSON.parse(songs).tracks.items;
      db.save(songs);
    });

}
module.exports.getSpotifySongs = getSpotifySongs;
