angular.module('newapp')
 .controller('homeCtrl', function ($scope, $http, $location) {
	 
	$http.get("http://103.92.235.45/shop/admin/getStore").then(function(resp) {
		console.log(resp);
		$scope.storeDetails=resp.data.storeInfo;
		console.log($scope.storeDetails);
	});
	$scope.logout = function () {
		localStorage.clear();
		$location.path('/adminlogin');
	}
});