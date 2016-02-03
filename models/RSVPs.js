var mongoose = require('mongoose');

var RSVPSchema = new mongoose.Schema({
  title: String,
  date: String,
  startTime: String, 
  endTime: String,
  location: String,
  description: String
});

// RSVPSchema.methods.setRSVP = function(cb) {
//   this.save(cb);
// };

// CommentSchema.methods.downvote = function(cb) {
//   this.upvotes -= 1;
//   this.save(cb);
// };


mongoose.model('RSVP', RSVPSchema);