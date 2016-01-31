var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
  title: String,
  something: String,
  description: String
});

// EventSchema.methods.setEvent = function(cb) {
//   this.save(cb);
// };

// CommentSchema.methods.downvote = function(cb) {
//   this.upvotes -= 1;
//   this.save(cb);
// };


mongoose.model('Event', EventSchema);