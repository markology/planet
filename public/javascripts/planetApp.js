
$( function() {

  // PARDON ME while I do a little magic to keep these events relevant for the rest of time...
  var currentMonth = moment().format('YYYY-MM');
  var nextMonth    = moment().add('month', 1).format('YYYY-MM');


  clndr = $('#calendar').clndr({
    template: $('#full-clndr-template').html(),
    forceSixRows: true
  });


});