var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var Event = mongoose.model('Event'); 


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Planet' });
});

router.get('/myPortal', function(req, res) {
  res.render('myPortal', { title: 'Planet' });
});

router.get('/landing', function(req, res) {
  res.render('landing', { title: 'Planet' });
});

router.get('/portals', function(req, res) {
  res.render('portals', { title: 'Planet' });
});


router.get('/agenda', function(req, res) {
  res.render('agenda', { title: 'Planet' });
});


router.param('event', function(req,res, next, id){
	var query = Event.findById(id);

	query.exec(function(err, event){
		if(err){return next(err)}
			if(!event){return next(new Error("cant find event")) }

		req.event = event;
		return next();
	});
});

router.get('/events', function(req,res,next){
	Event.find(function(err, events){
		if(err){
			return next(err);
		}

		res.json(events);
	});
});

router.post('/events', function(req, res,next){
	var event = new Event(req.body);

	event.save(function (err, event){
		if(err){ return error(next)};
		res.json(event);
	})
});

router.get('/events/:event', function(req, res) {
  res.json(req.event);
});

router.delete('/events/:event', function(req, res){
	Event.findOneAndRemove({id: req.params.id}, function(err, result){
		res.json({
			message: "deleted"	,		
			event: result});

	});
});

// router.get('events/:event', function(req,res,body){
// 	req.event.populate()('ee')
// })

// router.param('day', function(res,req,id, next){
// 	var query = Day.findById(id);

// 	query.exec(function(err, day){
// 		if(err){return next(err)}
// 			if(!day){return next(new Error("cant find event")); }

// 		req.day = day;
// 		return next();
// 	});
// });


// router.post('/months/:month/weeks/:week/days/:day/events', function(req, res, next){
// 	var Event = new Event(req.body);
// 	event.title = req.title;
// 	event.something = req.something;
// 	event.description = req.description;
// 	event.author = req.author;

// 	event.save(function(err, event){
// 		if(err){return next(err)};
// 		// req.events.push(event);
// 		res.json(event);

// 	});
// });




// router.get('/month/:month/weeks/:week/days/:day/events/:event'){

// }


module.exports = router;
