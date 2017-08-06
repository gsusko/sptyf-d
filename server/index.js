var express = require('express');
var bodyParser = require('body-parser');
var fetch = require('../helpers/spotifyFetcher.js');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
var items = require('../database-mongo');
var db = require ('../database-mongo/index.js');
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
  });
  req.on('end', () => {
    body = JSON.parse(body);
    body[0].name = body[0].name.toLowerCase();
    db.save(body);
    res.send(body);
  });
});
app.get('/items', function (req, res) {
  // console.log(req.query.song)
  if (req.query.song) {
    items.item.
    find({}).
    where('name').equals(req.query.song.toLowerCase()).
    remove().
    exec((err, data) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(data);
        items.item.
        find({}).
        sort({'popularity': -1}).
        exec((err, data) => {
          if (err) {
            console.log(err);
          } else {
            res.json(data);
          }
        });
      }
    });
  } else {
    items.item.
    find({}).
    sort({'popularity': -1}).
    exec((err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.json(data);
      }
    });
  }
  // items.selectAll(function(err, data) {
  //   if(err) {
  //     res.sendStatus(500);
  //   } else {
  //     res.json(data);
  //   }
  // });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
