var app = angular.module('planet',['ui.router']);
var clndr = {};
var agenda = {};
var currentMonth = moment().format('YYYY-MM');
var nextMonth    = moment().add('month', 1).format('YYYY-MM');
var currentEvents;

app.config([
'$stateProvider',
'$urlRouterProvider',



function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl',
      data:{
      	 pageTitle: 'Planet'
      	}

  //     },
  //     resolve : {
		// 	postPromise : ['events',
		// 	function(events) {
		// 		return events.getAll();
		// 	}]

		// }
     
    })
    .state('landing',{
		url: '/landing',
		templateUrl: '/landing.html',
		controller: 'LandingCtrl',
		data: {
			pageTitle: ' '
		}
      	
	})
    .state('portals',{
	url: '/portals',
	templateUrl: '/portals.html',
	controller: 'PortalCtrl',
	data: {
		pageTitle: 'Portals'
	}
	})
	.state('myPortal',{
		url: '/myPortal',
		templateUrl: '/myPortal.html',
		controller: 'MyPortalCtrl',
		data: {
			pageTitle: 'My Portal'
		},
		onEnter: function(){
			setTimeout(

		function() {

		  clndr = $('#calendar').clndr({
		    template: $('#full-clndr-template').html(),
		    events: currentEvents,
		    forceSixRows: true
		  });

		}, 0);

			}
// 		onEnter: function(){
// 			setTimeout(

// function() {

//   clndr = $('#calendar').clndr({
//     template: $('#full-clndr-template').html(),
//     events: events,
//     forceSixRows: true
//   });

})

			
	
	.state('day',{
		url: '/day',
		templateUrl: '/day.html',
		controller: 'DayCtrl'
	})
	.state('agenda',{
		url: '/agenda',
		templateUrl: '/agenda.html',
		controller: 'AgendaCtrl',
		data:{
			pageTitle: 'Agenda'
		},
			
  resolve: {
    postPromise: ['events', function(events){
      return events.getAll();
    }]
  }
	})
	.state('login',{
		url:'/login',
		templateUrl: '/login.html',
		controller: 'AuthCtrl'
	})
	.state('register',{
		url: '/register',
		templateUrl: '/register.html',
		controller: 'AuthCtrl'
	})
	;

  $urlRouterProvider.otherwise('home');
}]);


app.factory( 'events', ['$http', 
	function($http){
	var o = {
		 events : []
		};


	o.getAll = function(){
console.log('entered this shit');
	 return  $http.get('/events').success(function(data){
		angular.copy(data, o.events)});

	
	};

	o.create = function(event){
		return $http.post('/events', event).success(function(data){
			o.events.push(data);
		});
	};

	o.removeEvent = function(ev){
	console.log(ev);
			return $http.delete('/events/' + ev).success(function(data){
			o.getAll();
		});
	}

	return o;

}]);


app.controller('MainCtrl',['$scope', '$state', '$rootScope',  function($scope, $state, $rootScope ){

}]);

app.controller('MyPortalCtrl',['$scope', '$state' , 'events', 
	function($scope , $state, events){
	// $scope.events = events.events;
	currentEvents = events.events;


	$scope.addEvent = function(){
		 if(!$scope.title || $scope.title === '') { return; }
		events.create({
			title: $scope.title,
			something: $scope.something,
			description: $scope.description
		});

		$scope.title = '';
		$scope.something = '';
		$scope.description = '';
	};

}]);

app.controller('LandingCtrl',['$scope', function($scope ){

}]);

app.controller('PortalCtrl',['$scope', function($scope ){

}]);

app.controller('AgendaCtrl',['$scope', 'events', function($scope, events ){
		$scope.events = events.events;
		$scope.removeEvent = function(ev){
			console.log(ev);
			events.removeEvent(ev);
		};

}]);

// app.run(['$rootScope', '$state', function ($rootScope, $state) {
//     $rootScope.$on('$stateChangeStart', function (event, next) {
//         if (true) {
//           if(next.name!='myPortal') {
//             event.preventDefault();
//             $state.go('myPortal');
//           }
//         }
//     });
// }]);


app.directive('title', ['$rootScope', '$timeout',
  function($rootScope, $timeout) {
    return {
      link: function() {

        var listener = function(event, toState) {

          $timeout(function() {
            $rootScope.title = (toState.data && toState.data.pageTitle) 
            ? toState.data.pageTitle 
            : 'Default title';
          });
        };

        $rootScope.$on('$stateChangeSuccess', listener);
      }
    };
  }
]);






$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip({
  position: { my: "left+6 center", at: "right center" }
});
});

var clndr = {};

$( function() {

  // PARDON ME while I do a little magic to keep these events relevant for the rest of time...
  var currentMonth = moment().format('YYYY-MM');
  var nextMonth    = moment().add('month', 1).format('YYYY-MM');

  var events = [
    { something: currentMonth + '-' + '10', title: 'Persian Kitten Auction', location: 'Center for Beautiful Cats' },
    { something: currentMonth + '-' + '19', title: 'Cat Frisbee', location: 'Jefferson Park' },
    { something: currentMonth + '-' + '23', title: 'Kitten Demonstration', location: 'Center for Beautiful Cats' },
    { something: nextMonth + '-' + '07',    title: 'Small Cat Photo Session', location: 'Center for Cat Photography' }
  ];

  clndr = $('#full-clndr').clndr({
    template: $('#full-clndr-template').html(),
    events: events,
    forceSixRows: true
  });

  $('#mini-clndr').clndr({
    template: $('#mini-clndr-template').html(),
    events: events,
    clickEvents: {
      click: function(target) {
        if(target.events.length) {
          var daysContainer = $('#mini-clndr').find('.days-container');
          daysContainer.toggleClass('show-events', true);
          $('#mini-clndr').find('.x-button').click( function() {
            daysContainer.toggleClass('show-events', false);
          });
        }
      }
    },
    adjacentDaysChangeMonth: true,
    forceSixRows: true
  });

  $('#clndr-3').clndr({
    template: $('#clndr-3-template').html(),
    events: events,
    showAdjacentMonths: false
  });

  // $('#clndr-4').clndr({
  //   template: $('#clndr-4-template').html(),
  //   events: events,
  //   lengthOfTime: {
  //     days: 7,
  //     interval: 7
  //   }
  // });
});