angular.module('newapp')
  .controller('LoginCtrl', function($scope, $http, $location, $route) {
	$scope.redirect = function(session) {
		console.log(session);
	$http.post("http://103.92.235.45/shop/user/login", session)
		.then(function(resp) {
	if(resp.data.success == true){
		localStorage.setItem("loggedInUser", session.userName );
			console.log(localStorage.getItem("loggedInUser"));
		$location.path('/dashboard');
			$scope.title = resp.data.name;
			console.log($scope.title);
		localStorage.setItem("loggedInUserName", $scope.title);
			//console.log(localStorage.getItem(loggedInUserName));
			$scope.userType = resp.data.type;
			localStorage.setItem("loggedInUserType", $scope.userType);
			//console.log(localStorage.getItem(loggedInUserType));
			localStorage.setItem("loggedInuserId", resp.data.userId);
	}
	else {
		$scope.errmsg=true;
		$scope.errmessage = resp.data.errorMessage;
		$location.path('/login');		
	}
	});
	}
	$scope.alerthide=function(){
		$scope.errmsg=false;
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