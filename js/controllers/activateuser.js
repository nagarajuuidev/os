angular.module('newapp')
  .controller('activateuserCtrl', function ($scope, $http, $location) {
	console.log($location.search());
	$http.post("http://103.92.235.45/shop/user/activate", $location.search()).then(function(resp){
		console.log(resp);
		$location.path('/login');
	});
});