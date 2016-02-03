var mongoose = require('mongoose');

var UserSchema = new mongoose.schema({
	username: String,
	password: String,
	age: {type: Number, default: 99},
	active: {type: Boolean, default: true},
	eventsAuthored: [{events:{type: mongoose.Schema.Types.ObjectId, ref: 'Event'},
					timeStamp: String}]
});

mongoose.model('User', UserSchema);