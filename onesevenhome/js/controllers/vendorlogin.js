angular.module('newapp')
 .controller('vendorlogCtrl', function($scope, $http, $location, $route) {
	$scope.vendorlog = function(vlogin) {
		console.log(vlogin);
	$http.post("http://103.92.235.45/shop/user/login ", vlogin)
		.then(function(resp) {
	if(resp.data.success == true){
		localStorage.setItem("loggedInUser", vlogin.userName);
		console.log(localStorage.getItem("loggedInUser"));
		$location.path('/dashboard');
		$scope.title = resp.data.name;
			console.log($scope.title);
		localStorage.setItem("loggedInUserName", $scope.title);
			//console.log(localStorage.getItem(loggedInUserName));
		$scope.userType = resp.data.type;
			localStorage.setItem("loggedInUserType", $scope.userType);
			//console.log(localStorage.getItem(loggedInUserType));
	}
	else {
		$location.path('/vendorlogin');
		$scope.errmessage = resp.data.errorMessage;
	}
	});
	}
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
});