angular.module('newapp') 
  .controller('RegistrationCtrl', function ($scope, $http, $location, $route) {   
	$http.get("http://103.92.235.45/shop/getAllCategories").then(function(resp) {
		console.log(resp);
		$scope.menuitem = resp.data.categoryData;
	});
	$scope.mouseOver = function(param) {
		$scope.set_bg = function() {
		$scope.bgimg = param.imageURL;
			return {
				"background-image": "url(/clients/onesevenhome/img/" + $scope.bgimg + ".jpg)"
			};
		}
	}
	$scope.register = function (user) {
		user.activationURL="http://rainiersoft.com/clients/onesevenhome/#/activateuser";
	$http.post("http://103.92.235.45/shop/customer/register", user).then(function(resp) {
	if(resp.data.status == "true"){
		$location.path('/conform');
	}
	else {
		$location.path('/registration');
		$scope.errmessage = resp.data.errorMessage;
	}	
	});
};
});