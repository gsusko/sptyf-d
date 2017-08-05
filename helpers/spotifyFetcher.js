const request = require('request');
const rp = require('request-promise');
const $ = require('jquery');
// const db = require('../database/index.js');

const getSpotifySongs = function(query) {
  var url = `https://api.spotify.com/v1/search/?q=${query}&type=track&limit=20`
  var accessToken = "BQBU7THDe6vNdvOjmyte9OM_uSQOeqbBDzZvbTNmjQRDH5Q3TrJj9AOd0nGfWq89O1rB1dlk0oP3lixEI7ed9C-r0xeZTwQyC2HRjm1fcx7EPzP7gzGVLGfX32Gk7_zYCs_M3gWwkdeQ4a8";
  var options = {
    url: url,
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  }
  request.get(options, function (error, response, body) {
    console.log(options)
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
    console.log(JSON.parse(body))
    // db.save(JSON.parse(body));
  });
  // rp(options)
  //   .then(songs => {
  //       console.log('User has %d songs', songs.length);
  //   });

}
module.exports.getSpotifySongs = getSpotifySongs;
