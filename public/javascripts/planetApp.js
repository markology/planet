var app = angular.module('planet',['ui.router']);
var clndr = {};

var currentEvents;
var eventsThisMonth = [];
console.log(moment());
// var a = moment(Date());
// a.utcOffset(-5);

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
    })
    .state('landing',{
		url: '/landing',
		templateUrl: '/landing.html',
		controller: 'LandingCtrl',
		data: {
			pageTitle: ' '
		}
      	
	})
    .state('profile',{
	url: '/profile',
	templateUrl: '/profile.html',
	controller: 'ProfileCtrl',
	data: {
		pageTitle: 'Profile'
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
		    forceSixRows: true,
		    clickEvents: {
		    	click: function(target){
		    		console.log(target);

		    	},
		    	onMonthChange: function(){
		    		$('.day-contents span').each(function(){
						if(this.innerHTML === '0'){
							this.innerHTML = '';
						}
						else{
				this.innerHTML += ' <p>events</p>';
			}
					});
		    	}
		    }
		  });
  // 	 for( var i = 0; i < $('.day-contents span').length; i++){
		// if($('.day-contents span')[i].innerHTML === '0')
		// 	$('.day-contents span')[i].css('display', 'none!important');
		// }
		$('.day-contents span').each(function(){
			if(this.innerHTML === '0')
			{
				this.innerHTML = '';
			}
			else{
				this.innerHTML += ' <p>events</p>';
			}
		}); 

		
		}, 0);

			},
			
		resolve: {
		  postPromise: ['events', function(events){
		  	currentEvents = events.events;

 		    return events.getAll();
		  }]
		}
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
		 events : [],
		 eventsThisMonth: []
		};

	o.getAll = function(){
	 return  $http.get('/events').success(function(data){
	 	var thisMonth = [];
		for( var i = 0; i < data.length; i++){
			if(moment(data[i].date).month() == moment().month())
				thisMonth.push(data[i]);

		}
			angular.copy(thisMonth, o.eventsThisMonth);
			angular.copy(data, o.events);});

	};

	o.create = function(event){
		return $http.post('/events', event).success(function(data){
			o.events.push(data);
		});
	};

	o.removeEvent = function(ev){
			return $http.delete('/events/' + ev).success(function(data){
			o.getAll();
		});
	}

	// o.getEventsThisMonth = function(){
	//  return  $http.get('/events').success(function(data){
	//  	var thisMonth = [];
	// 	for( var i = 0; i < data.length; i++){
	// 		if(moment(data[i].date).month() == moment().month())
	// 			thisMonth.push(data[i]);

	// 	}
	// angular.copy(data, o.events)});
	// };


	return o;

}]);




app.controller('MainCtrl',['$scope', '$state', '$rootScope',  function($scope, $state, $rootScope ){

}]);



app.controller('MyPortalCtrl',['$scope', '$state' , 'events',
	function($scope , $state, events){
	// currentEvents = events.events;


	$scope.addEvent = function(){
		 if(!$scope.title || $scope.title === '') { return; }
		 if(moment($scope.date)._d.toString() == 'Invalid Date' || $scope.date === '') { return; }
		 if(!$scope.startTime || $scope.startTime === '') { return; }
		 if(!$scope.endTime || $scope.endTime === '') { return; }
		 if(!$scope.location || $scope.location === '') { return; }

		events.create({
			title: $scope.title,
			date: moment($scope.date),
			startTime: $scope.startTime,
			endTime: $scope.endTime,
			location: $scope.location,
			description: $scope.description,
			status: $scope.status
		});

		$scope.title = '';
		$scope.date = '';
		$scope.description = '';
		$scope.startTime = '';
		$scope.endTime = '';
		$scope.location = '';
		$scope.status = '';
	};




}]);

app.controller('LandingCtrl',['$scope', function($scope ){

}]);

app.controller('PortalCtrl',['$scope', function($scope ){

}]);

app.controller('AgendaCtrl',['$scope', 'events', function($scope, events ){
		$scope.events = events.events;
		$scope.removeEvent = function(ev){
			events.removeEvent(ev);
		};


}]);


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
  position: { my: "left+6 center", at: "right center" },
  animation: false
});




});

