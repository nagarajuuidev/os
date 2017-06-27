var newapp=angular.module('newapp',['ngRoute','slickCarousel','ui.grid']);

newapp.config(['$routeProvider',function($routeProvider){
	$routeProvider
      .when('/', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/registration', {
        templateUrl: 'views/registration.html',
        controller: 'RegistrationCtrl'
      })
	  .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
	  .when('/contact', {
		templateUrl: 'views/contact.html',
		controller: 'ContactCtrl'
	  })
	  .when('/services', {
		templateUrl: 'views/services.html',
		controller: 'ServicesCtrl'
	  })
	   .when('/detailservices/:sid', {
		templateUrl: 'views/detailservices.html',
		controller: 'DetailservicesCtrl'
	  })
	  .when('/todaydeals', {
		templateUrl: 'views/todaydeals.html',
		controller: 'TodaydealsCtrl'
	  })
	  .when('/productpage', {
		templateUrl: 'views/productpage.html',
		controller: 'ProductpageCtrl'
	  })
	  .otherwise({
        redirectTo: '/'
      });
}]);




