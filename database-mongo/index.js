var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var itemSchema = mongoose.Schema({
  id: {type:String},
  name: String,
  popularity: Number,
  artists: Array,
  preview_url: String,
  album: Object
});

var Item = mongoose.model('Item', itemSchema);

let save = (songs) => {
  songs.forEach(function(song) {
    var newSong = new Item(song);
    newSong.save((err, newSong) => {
      if (err) {
        throw err;
      }
    })
    .then(newSong => {
      resolve(newSong);
    });
  });
}

var selectAll = function(callback) {
  Item.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

module.exports.selectAll = selectAll;
module.exports.save = save;
module.exports.item = Item;
