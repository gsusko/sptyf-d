var express = require('express');
var bodyParser = require('body-parser');
var fetch = require('../helpers/spotifyFetcher.js');
var items = require('../database-mongo');
var db = require ('../database-mongo/index.js');
var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

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
  if (req.query.song) {
    items.item.
    find({}).
    where('name').equals(req.query.song.toLowerCase()).
    remove().
    exec((err, data) => {
      if (err) {
        console.log(err);
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
    });
  } else if (req.query.term) {
    items.item.
    find({}).
    sort({'_id': -1}).
    exec((err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.json(data);
      }
    });
  } else if(req.query.find) {
    items.item.
    find({}).
    where('name').equals(req.query.find.toLowerCase()).
    exec((err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.json(data);
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
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('listening on port 3000!');
});
