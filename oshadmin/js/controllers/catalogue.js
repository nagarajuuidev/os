angular.module('newapp')
 .controller('catalogueCtrl', function ($scope, $http, $location) {
	 
	$http.get("http://103.92.235.45/shop/getAllCategories").then(function(resp) {	
	console.log(resp);
$scope.data=resp.data.categoryData;	

	});
	$scope.treesel=function(param){
		console.log(param);
		
	}
	$scope.logout = function () {
		localStorage.clear();
		$location.path('/adminlogin');
	}
});