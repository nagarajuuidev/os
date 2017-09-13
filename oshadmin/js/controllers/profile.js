angular.module('newapp')
 .controller('profileCtrl', function ($scope, $http, $location) {
	$scope.logout = function () {
		localStorage.clear();
		$location.path('/adminlogin');
	}
	$scope.alerthide=function(){
		$scope.errmsg=false;
	}
	$http.get("http://103.92.235.45/shop/admin/list").then(function(resp) {
		console.log(resp);
		$scope.setAdmin = resp.data.adminList['0'];
		console.log($scope.setAdmin);
		$scope.userName = resp.data.adminList['0'].adminName;
		console.log($scope.userName);
		$scope.defaultLang = resp.data.adminList['0'].defaultLang.code;
		console.log($scope.defaultLang);
		
	});
	$scope.updateAdmin = function(setAdmin) {
		setAdmin.userName = $scope.userName;
		setAdmin.defaultLang = $scope.defaultLang;
		delete setAdmin.adminName;
		console.log(setAdmin);
		$http.post("http://103.92.235.45/shop/admin/update", setAdmin).then(function(resp) {
			console.log(resp);
			if(resp.data.status == "true") {
				$scope.errmsg=true;
				$scope.errmessage = resp.data.sucessMessage;
				console.log($scope.errmessage);
			}
			else {
				$scope.errmsg = true;
				$scope.errmessage = resp.data.errorMessage;
			}
		});
	}
});