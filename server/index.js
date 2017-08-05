var express = require('express');
var bodyParser = require('body-parser');
var fetch = require('../helpers/spotifyFetcher.js');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
var items = require('../database-mongo');

var app = express();

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.post('/items', function(req, res) {
  var body = '';
  req.on('data', (chunk) => {
    body += chunk;
    console.log(body);
  });
  req.on('end', () => {
    body = JSON.parse(body);
    var songs = fetch.getSpotifySongs(body.term);
    res.send(songs);
  });
});
app.get('/items', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
