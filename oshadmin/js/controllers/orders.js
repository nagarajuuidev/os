angular.module('newapp')
 .controller('ordersCtrl', function ($scope,$http, $location) {
	$scope.logout = function () {
		localStorage.clear();
		$location.path('/adminlogin');
	}
});
