var mongoose = require('mongoose');

var DaySchema = new mongoose.Schema({
  date: Date,
  events: [{type: mongoose.Scheme.Types.ObjectId, ref: 'Event'}]
});

// DaySchema.methods.setDay = function(cb) {
//   this.save(cb);
// };

// CommentSchema.methods.downvote = function(cb) {
//   this.upvotes -= 1;
//   this.save(cb);
// };


mongoose.model('Day', DaySchema);