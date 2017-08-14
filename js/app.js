var newapp=angular.module('newapp',['ngRoute', 'slickCarousel', 'ui.grid','bw.paging']);
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
	.when('/vendorlogin', {
		templateUrl: 'views/vendorlogin.html',
		controller: 'vendorlogCtrl'
	})
	.when('/activateuser', {
		templateUrl: 'views/vendorlogin.html',
		controller: 'activateuserCtrl'
	})
	.when('/registration', {
		templateUrl: 'views/registration.html',
		controller: 'RegistrationCtrl'
	})
	.when('/vendorreg',{
		templateUrl: 'views/vendorregistration.html',
		controller: 'vendorregCtrl'
	})
	.when('/forgetpassword',{
		templateUrl: 'views/forgetpassword.html',
		controller: 'forgetPassCtrl'
	})
	.when('/newpassword',{
		templateUrl: 'views/newpassword.html',
		controller: 'forgetPassCtrl'
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
	.when('/productpage/:prodid', {
		templateUrl: 'views/productpage.html',
		controller: 'ProductpageCtrl'
	})
	.when('/categories/:cid', {
		templateUrl: 'views/productlist.html',
		controller: 'ProductlistCtrl'
	})
	.when('/sub_category/:cid/categories/:sid', {
		templateUrl: 'views/productlist.html',
		controller: 'ProductlistCtrl'
	})
	.when('/vendorcategories/:cid', {
		templateUrl: 'views/productlist.html',
		controller: 'ProductlistCtrl'
	})
	.when('/myaccount', {
		templateUrl: 'views/myaccount.html',
		controller: 'myaccountCtrl'
	})
	.when('/cart', {
		templateUrl: 'views/cart.html',
		controller: 'cartctrl'
	})
    .when('/delivery', {
		templateUrl: 'views/delivery.html',
		controller: 'deliveryctrl'
	})
	.when('/payment', {
		templateUrl: 'views/payment.html',
		controller: 'paymentctrl'
	})
	.when('/viewmsg', {
		templateUrl: 'views/viewmsg.html',
		controller: 'viewmsgctrl'
	})
	.when('/conform', {
		templateUrl: 'views/conform.html',
		controller: 'conformCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});
}]);