angular.module('newapp')
 .controller('addProdCtrl', function ($scope, $http, $location) {
	$http.get("http://103.92.235.45/shop/getAllCategories").then(function(resp) {
		console.log(resp);
		$scope.menuitem = resp.data.categoryData;
	});
	$scope.catchange=function(){
     console.log($scope.catvalue);
	  var index = $scope.menuitem.findIndex(function(item, i) {
        return item.title === $scope.catvalue;
    });
		$scope.categorySub = $scope.menuitem[index].subCategory
	}
	$scope.subCatChange = function(){
		console.log($scope.subCatValue);
		$http.get("http://103.92.235.45/shop/categories/" + $scope.subCatValue +"?"+"pageNumber=1&pageSize=15").then(function(resp) {
		$scope.routedata=resp;
		console.log($scope.routedata);
		});
	}
	$scope.logout = function () {
		localStorage.clear();
		$location.path('/adminlogin');
	}
});