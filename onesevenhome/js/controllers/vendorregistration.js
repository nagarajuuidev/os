angular.module('newapp') 
  .controller('vendorregCtrl', function ($scope, $http, $location, $route) {
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
	$scope.regvendor = function (vendor){
	vendor.activationURL="http://rainiersoft.com/clients/onesevenhome/#/activateuser";
	$http.post("http://103.92.235.45/shop/vendor/register", vendor).then(function(resp) {
	if(resp.data.status == "true"){
		$location.path('/conform');
	}
	else {
		$location.path('/vendorreg');
		$scope.errmessage = resp.data.errorMessage;
		}	
	});
	};
});