var newapp=angular.module('newapp',['ngRoute','ui.tree']);

newapp.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
	$routeProvider
      
	   .when('/', {
        templateUrl: 'views/adminlogin.html',
        controller: 'adminloginCtrl'
      })
	  .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'homeCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
	  .when('/store', {
        templateUrl: 'views/store.html',
        controller: 'storeCtrl'
      })
	  .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'profileCtrl'
      })
	  .when('/changepassword', {
		  templateUrl : 'views/changepassword.html',
		  controller : 'changePassCtrl'
	  })
	  .when('/addproducts', {
		  templateUrl : 'views/addproducts.html',
		  controller : 'addProdCtrl'
	  })
	  .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
	  .when('/orders', {
        templateUrl: 'views/orders.html',
        controller: 'ordersCtrl'
      })
	  .when('/catalogue', {
        templateUrl: 'views/catalogue.html',
        controller: 'catalogueCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
}]);
newapp.controller('bodyController', function($scope, $location,$rootScope) {
  $scope.location = $location.path();    $rootScope.$on('$routeChangeSuccess', function() {        $scope.location = $location.path();    });
  $scope.logout = function() {
	  localStorage.clear();
	  $location.path('/');
  }
});