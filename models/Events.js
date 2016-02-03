var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
  title: String,
  date: Date,
  startTime: String, 
  endTime: String,
  location: String,
  description: String,
  status: {
  	active: {type: Boolean, default: true},
  	rainDate: Date
  },
  attending:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}] ,
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  minimumAttendance: {type: Number, default: 0},
  maximumAttendance: {type: Number, default: 9999}
});

// EventSchema.methods.setEvent = function(cb) {
//   this.save(cb);
// };

// CommentSchema.methods.downvote = function(cb) {
//   this.upvotes -= 1;
//   this.save(cb);
// };


mongoose.model('Event', EventSchema);