var mongoose = require('mongoose');

var MonthSchema = new mongoose.Schema({
  startDayOfWeek: String,
  length: {type: Number, default: 31},
  days: [{type: mongoose.Schema.Types.ObjectId, ref : 'Day'}]
});

// MonthSchema.methods.setMonth = function(cb) {
//   this.save(cb);
// };

// CommentSchema.methods.downvote = function(cb) {
//   this.upvotes -= 1;
//   this.save(cb);
// };


mongoose.model('Month', MonthSchema);