var newapp=angular.module('newapp',['ngRoute', 'slickCarousel', 'ui.grid','bw.paging','ngScrollbars']);
 newapp.config(['$routeProvider','ScrollBarsProvider',function($routeProvider,ScrollBarsProvider){
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
	ScrollBarsProvider.defaults = {
				 scrollButtons: {
      scrollAmount: 'auto', // scroll amount when button pressed
      enable: true //  scrolling buttons by default
    },    
 scrollInertia: 0,
    axis: 'y'
		 };
}]).controller('categoryCtrl',['$scope', function($scope){
	
	$scope.scrollbarConfig = {
			autoHideScrollbar: false,
	theme: 'light-3',
	 callbacks: {
        onScroll: function() {
            scrollIt(this);
        }
    },
	advanced:{
		updateOnContentResize: true
	},		
		scrollInertia: 0
			}
			$scope.topPosition=$(".cat-link").offset().top+55+"px";
	
	var scrollbarDnBtn=$(".mCSB_buttonDown");
$("body").on("mouseover",".scroll-down",function(){
   $( ".mCSB_buttonDown" ).triggerHandler( "mousedown" );
}).on("mouseout",function(){

   $( ".mCSB_buttonDown" ).triggerHandler("mouseup");
});

// Scroll up
var scrollbarUpBtn=$(".mCSB_buttonUp");
$("body").on("mouseover",".scroll-up",function(){
    $( ".mCSB_buttonUp" ).triggerHandler("mousedown");
}).on("mouseout",function(){
    $(".mCSB_buttonUp").triggerHandler("mouseup");
});	
}]);


angular.module('newapp')
    .directive('loading',   ['$http' ,function ($http)
    {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs)
            {
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (v)
                {
                    if(v){
                        elm.show();
                    }else{
                        elm.hide();
                    }
                });
            }
        };
    }]);