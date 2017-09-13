angular.module('newapp')
 .controller('storeCtrl', function ($scope, $http, $location) {
	 
	$scope.logout = function () {
		localStorage.clear();
		$location.path('/adminlogin');
	}
	$http.get("http://103.92.235.45/shop/admin/getStore").then(function(resp) {
		console.log(resp);
		$scope.setStore=resp.data.storeInfo;
		console.log($scope.setStore);
	});
	$scope.alerthide=function(){
		$scope.errmsg=false;
	}
	$scope.storeUpdate = function (setStore) {
		delete setStore.storeCountry;
		console.log(setStore);
		$http.post("http://103.92.235.45/shop/admin/updatestore", setStore).then(function(resp){
			console.log(resp);
			if(resp.data.status == "true") {
				$scope.errmsg=true;
				$scope.errmessage = resp.data.successMessage;
				console.log($scope.errmessage);
			}
			else {
				$scope.errmsg=true;
				$scope.errmessage = resp.data.errorMessage;
				$location.path('/store');
			}
		});
	}
	$scope.logout = function () {
		localStorage.clear();
		$location.path('/adminlogin');
	}
});	