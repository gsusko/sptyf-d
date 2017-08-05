const request = require('request');
const rp = require('request-promise');
const db = require('../database-mongo/index.js');

const getSpotifySongs = function(query) {
  var url = `https://api.spotify.com/v1/search/?q=${query}&type=track&limit=20`
  var accessToken = "BQBA3wOgTPMaG3HHak04xp0Hd82OTvdFmjpMYW-IWS4yBtOSawHsn_KDkCFJImrLu2BqCCdvUvMpiEizk701W14_6XvuXXO2ojcXHJUhbTiDtQJUuwqC4Xdvgh-o5UDaHK1OoDcT98BoPFI";
  var options = {
    url: url,
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  }
  // request.get(options, function (error, response, body) {
  //   console.log(options)
  //   console.log('error:', error);
  //   console.log('statusCode:', response && response.statusCode);
  //   console.log('body:', body);
  //   console.log(JSON.parse(body))
  // });
  rp(options)
    .then(songs => {
      songs = JSON.parse(songs).tracks.items;
      db.save(songs);
    });

}
module.exports.getSpotifySongs = getSpotifySongs;
