angular.module('newapp')
  .controller('adminloginCtrl', function($scope, $http, $location) {
	$scope.redirect = function(admin) {
		console.log(admin);
	  $http.post("http://103.92.235.45/shop/admin/login", admin).then(function(resp) {
		localStorage.setItem("loggedInUser", admin.emailAddress);
		if(resp.data.status == "true"){
			$scope.title = resp.data.adminName;
			$scope.adminId = resp.data.id;			
			localStorage.setItem("loggedInUserName", $scope.title);
			localStorage.setItem("loggedInuserId", $scope.adminId);
			$location.path('/home');
		}
		else {
			$scope.errmsg=true;
			$scope.errmessage = resp.data.errorMessage;
			console.log($scope.errmessage);
			$scope.admin.password ="";
			$location.path('/');
		}
	  });
	}
	$scope.alerthide=function() {
		$scope.errmsg=false;
	}
});